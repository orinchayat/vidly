import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import Login from "./components/login";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import * as authService from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
