import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { BASE_URL } from "../../../constants/api";
import Loading from "../../common/Loading";
import Heading from "../../layout/Heading";
import PageListHtml from "../../ui/PageListHtml";

export default function Pages() {
  const [pages, setPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPages() {
      try {
        const response = await fetch(BASE_URL + "wp/v2/pages");

        if (response.ok) {
          const json = await response.json();
          setPage(json);
        } else {
          setError("Aouch. An error occured.");
        }
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPages();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <Alert variant="danger" className="mt-5">
        {error}
      </Alert>
    );

  return (
    <div className="mt-5 wrap">
      <Heading size="4" content="Published pages" />
      <PageListHtml arr={pages} />
    </div>
  );
}
