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
import LoginImg from "../Source/LoginImg.jpg";

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
    <React.Fragment>
      <div id="Group_3">
        <svg className="Rectangle_15_m">
          <linearGradient
            id="Rectangle_15_m"
            spreadMethod="pad"
            x1="0.968"
            x2="0.077"
            y1="0.032"
            y2="0.923"
          >
            <stop offset="0" stopColor="#0173bc" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#3ec9b4" stopOpacity="1"></stop>
          </linearGradient>
          <rect
            id="Rectangle_15_m"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="1920"
            height="982"
          ></rect>
        </svg>
        <svg className="Path_3_o" viewBox="0 0 1920 881.1">
          <linearGradient
            id="Path_3_o"
            spreadMethod="pad"
            x1="0.5"
            x2="0.5"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#0173bc" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#3ec9b4" stopOpacity="1"></stop>
          </linearGradient>
          <path
            id="Path_3_o"
            d="M 1920 0 L 1920 284.2436218261719 C 791.34716796875 13.62161636352539 214.0684814453125 586.4359741210938 0 881.1000366210938 L 0 0 L 1920 0 Z"
          ></path>
        </svg>
        <svg className="Path_4" viewBox="196.566 0 303.434 982">
          <path
            id="Path_4"
            d="M 500 0 L 500 982 L 196.5659942626953 982 C 207.3100128173828 692.4866333007812 257.3472290039062 478.0748291015625 313.7440795898438 324.8763427734375 C 399.509033203125 91.90113067626953 500 0 500 0 Z"
          ></path>
        </svg>
      </div>
      <Card className="login">
        <img src={LoginImg} />
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
    </React.Fragment>
  );
};

export default Login;
