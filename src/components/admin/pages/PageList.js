import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../common/Loading";
import Heading from "../../layout/Heading";
import PageListHtml from "../../ui/PageListHtml";

export default function PageList() {
  const [page, setPage] = useState([]);
  const [draft, setDraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    async function getPages() {
      try {
        const response = await http.get("wp/v2/pages/");
        const drafts = await http.get("wp/v2/pages?status=draft");

        setPage(response.data);
        setDraft(drafts.data);
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

  function draftHtml() {
    if (draft.length) {
      return (
        <>
          <Heading size="3" content="Drafted pages" />
          <PageListHtml arr={draft} />
        </>
      );
    }
  }

  return (
    <>
      <div className="d-flex">
        <div className="me-5">
          <Heading size="3" content="Published pages" />
          <PageListHtml arr={page} />
        </div>
        <div className="border-start ps-5">{draftHtml()}</div>
      </div>
    </>
  );
}
