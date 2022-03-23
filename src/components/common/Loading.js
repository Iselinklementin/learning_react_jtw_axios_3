import { Container, Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Container className="loading-wrap">
      <Spinner animation="grow" variant="dark">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default Loading;
