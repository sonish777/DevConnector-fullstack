import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import actionTypes from "../../actions/types";
import { getProfileById } from "../../actions/profile";
import Spinner from "../ui/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

class Profile extends Component {
  static propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearProfile();
  }

  render() {
    const { auth, profile } = this.props;
    return (
      <Fragment>
        {profile.profile === null || profile.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile.profile} />
              <ProfileAbout profile={profile.profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.profile.experiences.length > 0 ? (
                  <Fragment>
                    {profile.profile.experiences.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>

              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.profile.education.length > 0 ? (
                  <Fragment>
                    {profile.profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} edu={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>

              {profile.profile.githubUsername && (
                <ProfileGithub username={profile.profile.githubUsername} />
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileById: (id) => dispatch(getProfileById(id)),
    clearProfile: () =>
      dispatch({
        type: actionTypes.CLEAR_PROFILE,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
