import "./Header.scss";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { getCurrentUser } from "../../../services/authServices";
import { useEffect, useState } from "react";

interface HeaderParams {
  headerText: string;
  showUser: boolean;
}

export function Header(props: HeaderParams) {
  const [avatar, setAvatar] = useState(<FaRegUser id="avatar_icon" />);

  useEffect(() => {
    const loggedInUser = getCurrentUser();
    if (loggedInUser?.picture) {
      setAvatar(<img src={loggedInUser.picture}></img>);
    }
  }, []);

  return (
    <header>
      <h1>{props.headerText}</h1>
      {props.showUser && <Link to={"/profile"}>{avatar}</Link>}

    </header>
  );
}
