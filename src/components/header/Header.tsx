import "./Header.scss";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

interface HeaderParams {
  headerText: string;
}

export function Header(props: HeaderParams) {
  return (
    <header>
      <h1>{props.headerText}</h1>
      <Link to={"/profile"}>
        <FaRegUser />
      </Link>
    </header>
  );
}
