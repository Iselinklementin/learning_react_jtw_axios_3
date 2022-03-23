import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";
import PageList from "./pages/PageList";

export default function AdminPage() {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  // Im trying to navigate to "/" if u dont have a token. And it does, but
  // I get an error here saying: "Can't perform a React state update on an unmounted component".
  // not sure why. I need to read more about how useEffect works :)

  useEffect(() => {
    if (!auth) {
      return navigate("/");
    }
  }, []);

  return (
    <>
      <Heading content="Welcome to admin page" />
      <div className="mt-5">
        <PageList />
      </div>
    </>
  );
}
