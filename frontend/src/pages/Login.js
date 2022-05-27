import React from "react";

import Input from "../shared/FormElements/Input";
import Button from "../shared/FormElements/Button";
import Card from "../shared/UIElements/Card";
import { useForm } from "../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../shared/utils/validators";

import "./Login.css";

const Login = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: { value: "", isValid: false },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Calling the backend with formState.inputs
  };

  return (
    <Card className="login">
      <h2>Login Here</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          element="input"
          id="email"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Not a Valid E-mail Adress."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Not a Valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
