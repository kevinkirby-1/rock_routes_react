// src/components/ImageUploadInput.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageUploadInputProps {
  onImageUploadSuccess: (imageUrl: string) => void;
  initialImageUrl?: string; 
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ onImageUploadSuccess, initialImageUrl }) => {
//   const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  // Function to handle the actual upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      onImageUploadSuccess(imageUrl); // Pass the Cloudinary URL back to parent
      setPreviewUrl(imageUrl)
    } catch (err: any) {
      console.error('Error uploading image to Cloudinary:', err);
      setError('Failed to upload image. Please try again.');
    //   setImageFile(null);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Basic validation
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        // setImageFile(null);
        setPreviewUrl(null);
        return;
      }
    //   setImageFile(file);
      setError(null);

      uploadToCloudinary(file); // Call the upload function immediately
    } else {
    //   setImageFile(null);
      setPreviewUrl(initialImageUrl || null);
      setError(null);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading} // Disable input while uploading to prevent re-selection
      />
      {previewUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={previewUrl} alt="Image Preview" style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #ccc' }} />
        </div>
      )}
      {isUploading && <p>Uploading image... Please wait.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploadInput;