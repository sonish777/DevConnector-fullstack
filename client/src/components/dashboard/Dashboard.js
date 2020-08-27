import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../../components/ui/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { auth, profile } = this.props;

    return profile.loading && profile.profile === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
        </p>
        {profile.profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.profile.experiences} />
            <Education education={profile.profile.education} />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, Please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
