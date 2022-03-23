import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export default function FormError({ children }) {
  return <Alert variant="danger">{children}</Alert>;
}

FormError.propTypes = {
  children: PropTypes.node.isRequired,
};
