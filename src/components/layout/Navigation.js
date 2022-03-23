import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="flex-column flex-sm-row">
        {auth ? (
          <>
            <div className="d-flex">
              <Navbar.Brand href="/">MA3</Navbar.Brand>
              <Nav.Link href="/">Pages</Nav.Link>
            </div>
            <div>
              <Navbar.Text className="me-4">
                <small>Signed in as: {auth.user_nicename}</small>
              </Navbar.Text>
              <Button className="logout" onClick={logout}>
                Log out
              </Button>
            </div>
          </>
        ) : (
          <div className="d-flex">
            <Navbar.Brand href="/">MA3</Navbar.Brand>
            <Nav.Link href="/">Pages</Nav.Link>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
