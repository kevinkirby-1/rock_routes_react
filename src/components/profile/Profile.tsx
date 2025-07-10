import "./Profile.scss";
import { Header } from "../header/Header";

export function Profile() {
  return (
    <section className="app_body">
      <Header headerText="Profile" />
      <section className="content_body"></section>
    </section>
  );
}
