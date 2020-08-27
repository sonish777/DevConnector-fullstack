import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  // REDIRECT IF LOGGED IN

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthenticated) {
      nextProps.history.push("/dashboard");
      return {};
    } else return prevState;
  }

  render() {
    return (
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.onChangeHandler}
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Dont have an accont ? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
