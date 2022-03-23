import * as yup from "yup";
import axios from "axios";
import FormError from "../common/FormError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../layout/Heading";
import { Button, Container, Form } from "react-bootstrap";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSumbitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSumbitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSumbitting(false);
    }
  }

  return (
    <Container>
      <div className="wrap">
        <Heading content="Hello! Please sign in." />
      </div>

      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {loginError && (
          <FormError>
            Please check that you have the right username and password. <small> {loginError} </small>
          </FormError>
        )}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3">
            <Form.Label>Username: </Form.Label> <br />
            <Form.Control name="username" placeholder="Username" {...register("username")} />
            {errors.username && <FormError>{errors.username.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password: </Form.Label> <br />
            <Form.Control name="password" placeholder="Password" {...register("password")} type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </Form.Group>

          <Button className="mt-3 mb-4" type="submit">
            {submitting ? "Logging in.." : "Login"}
          </Button>
        </fieldset>
        <hr />
      </Form>
    </Container>
  );
}
