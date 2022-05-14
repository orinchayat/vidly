import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await authService.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // bad req
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email", "email", "email")}
          {this.renderInput("Password", "password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
export default Login;
