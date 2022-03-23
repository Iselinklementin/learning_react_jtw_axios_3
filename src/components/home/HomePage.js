import { Container } from "react-bootstrap";
import LoginForm from "../login/LoginForm";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import AdminPage from "../admin/AdminPage";
import Pages from "./page/Pages";

export default function HomePage() {
  const [auth] = useContext(AuthContext);

  // Not sure if this is the correct way to do it.
  // The url isnt`t "/admin" like the MA says, its still just "/"
  // But instead of hiding the homepage when signed in,
  // I change it to show the stuff I want.
  // Would be good with a feedback on using this method :)

  return (
    <Container className="mt-5">
      {auth ? (
        <AdminPage />
      ) : (
        <>
          <LoginForm />
          <Pages />
        </>
      )}
    </Container>
  );
}
