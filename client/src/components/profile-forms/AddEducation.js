import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";

class AddEducation extends Component {
  state = {
    formData: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
    },
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
    // console.log(this.state.formData);
    this.props.addEducation(this.state.formData, this.props.history);
  };

  // static

  render() {
    // console.log(this.props.history);
    const formData = this.state.formData;
    return (
      <Fragment>
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              //   required
              value={formData.school}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              //   required
              value={formData.degree}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
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
              Current School or Bootcamp
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
              placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEducation: (data, history) => dispatch(addEducation(data, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddEducation);
