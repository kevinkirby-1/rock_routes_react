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
        <div id="profile">
          <img src={loggedInUser.picture} alt="" />
          <h1 id="name">{loggedInUser.name}</h1>
          <p id="email">Email: {loggedInUser.email}</p>
          <hr />
          <button onClick={logout}>Log Out</button>
        </div>
      </section>
    </section>
  );
}
