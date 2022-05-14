import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/usersService";
import * as authService from "../services/authService";

class RegisterForm extends Form {
  state = { data: { email: "", password: "", name: "" }, errors: {} };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);

      authService.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email", "email", "email")}
          {this.renderInput("Password", "password", "password")}
          {this.renderInput("Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
