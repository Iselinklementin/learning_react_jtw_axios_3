import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import { Button, Container, Form, Alert } from "react-bootstrap";
import DateFunction from "../../ui/DateFunction";
import Loading from "../../common/Loading";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function EditPage() {
  const [page, setPage] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [fetchingPage, setFetchingPage] = useState(true);
  const [updatingPage, setUpdatingPage] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const http = useAxios();
  let { id } = useParams();
  const url = `wp/v2/pages/${id}`;

  useEffect(
    () => {
      async function getPage() {
        try {
          const response = await http.get(url);
          setPage(response.data);
        } catch (error) {
          setFetchError(error.toString());
        } finally {
          setFetchingPage(false);
        }
      }
      getPage();
    }, // eslint-disable-next-line
    []
  );

  async function onSubmit(data) {
    setUpdatingPage(true);
    setUpdateError(null);
    setUpdated(false);

    try {
      const response = await http.put(url, data);
      setUpdated(true);
      setPage(response.data);
    } catch (error) {
      console.log(error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPage(false);
    }
  }

  if (fetchingPage) return <Loading />;
  if (fetchError) return <Alert variant="danger">Error loading page</Alert>;

  const editHeading = `Edit page`;

  return (
    <Container className="mt-5">
      <div className="wrap">
        <Heading content={editHeading} />
        <p className="mb-0">
          <span className="fw-bold">Title: </span>
          {page.title.rendered}
        </p>
        <DateFunction date={page.date} />
        <p>
          <span className="fw-bold">Current status: </span>
          <span>{page.status.charAt(0).toUpperCase() + page.status.slice(1)}</span>
        </p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {updated && (
          <Alert className="success">
            The page was updated.
            <br /> <Link to="/">Go back</Link>
          </Alert>
        )}
        {updateError && <FormError>{updateError}</FormError>}

        <fieldset disabled={updatingPage}>
          <Form.Group className="mb-3">
            <Form.Label>Title: </Form.Label> <br />
            <Form.Control name="title" defaultValue={page.title.rendered} placeholder="Title" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status: </Form.Label> <br />
            <Form.Select name="status" defaultValue={page.status} {...register("status")}>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" type="submit">
            {updatingPage ? "Updating.." : "Update"}
          </Button>
        </fieldset>
      </Form>

      <div className="wrap mt-5">
        <Heading size="3" content="Excerpt" />
        <p dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }}></p>
      </div>
    </Container>
  );
}
