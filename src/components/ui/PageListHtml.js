import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

function PageListHtml(props) {
  const [auth] = useContext(AuthContext);
  // const [auth, setAuth] = useContext(AuthContext);
  // Get a warning saying: 'auth' is assigned a value but never used on my loginForm, and login doesnt work if I remove it.
  // But here i can remove it without anything breaking the code. Not sure why.

  let linked = ``;

  if (auth) {
    linked = `/admin/edit/`;
  } else {
    linked = `page/`;
  }

  return (
    <ListGroup variant="flush" as="ul" className="mb-5 mt-3">
      {props.arr.map((item) => {
        return (
          <ListGroup.Item as="li" key={item.id} className="list-group-item-action">
            <Link to={linked + item.id} className="text-dark text-decoration-none">
              {item.title.rendered}
            </Link>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default PageListHtml;
