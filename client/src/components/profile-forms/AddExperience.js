import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link } from "react-router-dom";

class AddExperience extends Component {
  state = {
    formData: {
      title: "",
      company: "",
      location: "",
      from: "",
      current: false,
      to: "",
      description: "",
    },
  };

  static propTypes = {
    addExperience: PropTypes.func.isRequired,
  };

  onChangeHandler = (e) => {
    const newFormData = { ...this.state.formData };
    e.target.name === "current"
      ? (newFormData[e.target.name] = !newFormData.current)
      : (newFormData[e.target.name] = e.target.value);

    this.setState({
      formData: newFormData,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.addExperience(this.state.formData, this.props.history);
  };

  render() {
    const formData = this.state.formData;

    return (
      <Fragment>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              // required
              value={formData.title}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              // required
              value={formData.company}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={formData.current}
                onChange={this.onChangeHandler}
              />
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={this.onChangeHandler}
              disabled={formData.current}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={formData.description}
              onChange={this.onChangeHandler}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExperience: (data, history) => dispatch(addExperience(data, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddExperience);
