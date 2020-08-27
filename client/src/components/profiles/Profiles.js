import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Component } from "react";
import Spinner from "../ui/Spinner";
import { getProfiles } from "../../actions/profile";

import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    return (
      <Fragment>
        {this.props.profile.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i>
              Browse and connect with developers
            </p>
            <div className="profiles">
              {this.props.profile.profiles.length > 0 ? (
                this.props.profile.profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4> Np profiles found... </h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
