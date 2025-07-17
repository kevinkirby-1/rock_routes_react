import "./Profile.scss";
import { Header } from "../../components/layout/header/Header";
import { getCurrentUser, logoutUser } from "../../services/authServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AppUser } from "../../types/User";
import { Nav } from "../../components/layout/nav/Nav";

export function Profile() {
  const [loggedInUser, setloggedInUser] = useState<AppUser>();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setloggedInUser(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!loggedInUser) {
    return <div>Loading profile...</div>;
  }

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <section className="app_body">
      <Header headerText="Profile" showUser={true} />
      <Nav></Nav>
      <section className="content_body">
        <img src={loggedInUser.picture} alt="" />
        <h1>Name: {loggedInUser.name}</h1>
        <h1>Email: {loggedInUser.email}</h1>
        <hr />
        <button onClick={logout}>Log Out</button>
      </section>
    </section>
  );
}
