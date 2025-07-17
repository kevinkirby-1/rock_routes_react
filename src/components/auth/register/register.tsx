import "../auth.scss";
import { Header } from "../../layout/header/Header";
import { registerUser } from "../../../services/authServices";
import GoogleAuthButton from "../google/google_auth_button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function Register() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const register = async (formData: FormData) => {
    const given_name = formData.get("first_name") as string;
    const family_name = formData.get("last_name") as string;
    const name = given_name + " " + family_name;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = {
      given_name,
      family_name,
      name,
      email,
      password,
    };
    try {
      await registerUser(user);

      login();
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header headerText="" showUser={false} />
      <section className="content_body">
        <section className="auth_page">
          <div className="auth-header">
            <img src="/rock_routes_logo_192px.png" alt="Rock Routes Logo" />
            <h1>Log In To Rock Routes</h1>
          </div>
          <form action={register}>
            <label>
              First Name
              <input type="text" name="first_name" required />
            </label>
            <label>
              Last Name
              <input type="text" name="last_name" required />
            </label>
            <label>
              Email
              <input type="text" name="email" required />
            </label>
            <label>
              Password
              <input type="text" name="password" required />
            </label>
            <button type="submit">Create Account</button>
          </form>
          <p>
            Already have an account? Log in <Link to={"/login"}>here</Link>{" "}
          </p>
          <div className="googleAuth">
            <GoogleAuthButton />
          </div>
        </section>
      </section>
    </section>
  );
}
