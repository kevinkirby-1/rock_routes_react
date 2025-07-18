import "../NewForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";
import type { ClimbingGym } from "../../types/Gym";
import { createGym, getGymById, updateGym } from "../../services/gymServices";
import { Header } from "../../components/layout/header/Header";
import { useEffect, useState } from "react";
import ImageUploadInput from "../../components/image_upload_input/ImageUploadInput";
import { Nav } from "../../components/layout/nav/Nav";

interface EditGymParams {
  id: string;
  [key: string]: string | undefined;
}

export function NewGym() {
  const [editGym, setEditGym] = useState<ClimbingGym>();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | undefined>(editGym?.img);

  const navigate = useNavigate();
  const { id } = useParams<EditGymParams>();

  useEffect(() => {
    const getEditGym = async () => {
      try {
        if (id === "new" || !id) {
          setEditGym(undefined);
          setisLoading(false);
        } else {
          // Get gym by id
          const gym = await getGymById(id);
          setEditGym(gym);
          setisLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getEditGym();
  }, []);

  const handleImageUploadSuccess = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const addOrEditGym = async (formData: FormData) => {
    const name = formData.get("gymName") as string;
    const address = formData.get("gymAddress") as string;
    const description = formData.get("gymDescription") as string;
    let isIndoor = false;
    if (formData.get("gymIsIndoors")) {
      isIndoor = true;
    }

    const currentUser = getCurrentUser();

    const newClimbingGym: ClimbingGym = {
      name,
      img: imageUrl || editGym?.img || "/gym_placeholder.png",
      address,
      description,
      isIndoor,
      user: currentUser?._id ? currentUser._id : "",
    };

    try {
      let addedGym: ClimbingGym;
      if (editGym) {
        addedGym = await updateGym(id ? id : "", newClimbingGym);
      } else {
        addedGym = await createGym(newClimbingGym);
      }

      navigate(`/gyms/${addedGym._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header
        headerText={editGym ? "Edit Gym" : "Add Gym"}
        showUser={true}
      ></Header>
      <Nav></Nav>
      <section className="content_body">
        {!isLoading ? (
          <form action={addOrEditGym}>
            <label>
              Image
              <ImageUploadInput
                onImageUploadSuccess={handleImageUploadSuccess}
                initialImageUrl={editGym?.img}
              ></ImageUploadInput>
            </label>

            <label>
              Gym Name
              <input
                type="text"
                name="gymName"
                placeholder="Enter Gym Name"
                defaultValue={editGym?.name}
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="gymAddress"
                placeholder="Enter Gym Address"
                defaultValue={editGym?.address}
              />
            </label>

            <label>
              Description
              <textarea
                rows={5}
                name="gymDescription"
                placeholder="A description of the gym"
                defaultValue={editGym?.description}
              ></textarea>
            </label>

            <fieldset>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="gymIsIndoors"
                  defaultChecked={editGym ? editGym.isIndoor : true}
                />
                Indoor Gym
              </label>
            </fieldset>

            <button type="submit">{editGym ? "Edit Gym" : "Add Gym"}</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </section>
  );
}
