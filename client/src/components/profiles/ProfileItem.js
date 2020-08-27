import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={`img/${profile.user.avatar}`} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{" "}
          {profile.company && <span> at {profile.company} </span>}
        </p>
        <p className="my-1">
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {profile.skills.slice(0, 4).map((skill, i) => (
          <li key={i} className="text-primary">
            <i className="fas fa-check">{skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
