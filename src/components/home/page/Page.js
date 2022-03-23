import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import Loading from "../../common/Loading";
import Heading from "../../layout/Heading";
import DateFunction from "../../ui/DateFunction";

function Page() {
  const [page, setPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { id } = useParams();
  const url = `wp/v2/pages/${id}`;

  useEffect(
    () => {
      async function getPage() {
        try {
          const response = await fetch(BASE_URL + url);

          if (response.ok) {
            const json = await response.json();
            setPage(json);
          } else {
            setError("An error occured.");
          }
        } catch (error) {
          setError(error.toString());
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getPage();
    }, // eslint-disable-next-line
    []
  );

  if (loading) return <Loading />;
  if (error)
    return (
      <Alert variant="danger" className="mt-5">
        {error}
      </Alert>
    );

  return (
    <Container className="mt-5">
      <div className="wrap">
        <Heading content={page.title.rendered} />
        <DateFunction date={page.date} />
        <p>
          <span className="fw-bold">Current status: </span>
          <span>{page.status.charAt(0).toUpperCase() + page.status.slice(1)}</span>
        </p>
      </div>

      <div className="wrap mt-5">
        <Heading size="3" content="Excerpt" />
        <p dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }}></p>
      </div>
    </Container>
  );
}

export default Page;
