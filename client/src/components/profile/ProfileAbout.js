import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <Fragment>
          <h2 className="text-primary">
            {profile.user.name.trim().split(" ")[0]}'s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.length > 0 &&
          profile.skills.map((skill, i) => (
            <div className="p-1" key={i}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
