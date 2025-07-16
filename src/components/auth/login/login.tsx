import "./login.scss";
import { Header } from "../../layout/header/Header";
import { loginUser } from "../../../services/authServices";
import GoogleAuthButton from "../google/google_auth_button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const credentials = {
      email,
      password,
    };
    try {
      await loginUser(credentials);
      login();
      navigate("/projects");
    } catch (err) {
      const e = err as Error;
      if (e.message === "Invalid Email" || e.message === "Invalid Password") {
        setError(e.message);
      }
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header headerText="Log in" />
      <section className="content_body">
        <form action={handleLogin}>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <p id="error">{error}</p>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account, create account{" "}
          <Link to={"/register"}>Here</Link>
        </p>
        <GoogleAuthButton />
      </section>
    </section>
  );
}
