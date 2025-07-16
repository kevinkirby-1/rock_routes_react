import { useEffect } from "react";
import { loginWithGoogle } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleCredentialResponse = async (response: any) => {
    if (response.credential) {
      console.log("Google ID Token:", response.credential);
      try {
        // Try to send google id to backend
        const backendResponse = await loginWithGoogle(response.credential);
        console.log("Backend response (your JWT):", backendResponse);

        login();
        // Send user to profile page
        navigate("/projects");
      } catch (error) {
        // Sending google id failed
        console.error("Error sending Google ID token to backend:", error);
      }
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse, // The function to call after sign-in
        // auto_select: true, // Optional: automatically select an account if only one is logged in
        // cancel_on_tap_outside: false, // Optional: prevent dismissing one-tap by clicking outside
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button") as HTMLElement,
        { theme: "outline", size: "large", text: "signin_with", width: "250" } // Customize button appearance
      );

      //   Optional: Show the one-tap prompt
      //   window.google.accounts.id.prompt();
    }
  }, []);

  return (
    <div>
      <div id="google-sign-in-button"></div>{" "}
    </div>
  );
};

export default GoogleAuthButton;
