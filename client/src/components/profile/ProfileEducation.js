import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ edu }) => {
  return (
    <div>
      <h3 className="text-dark">{edu.school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {!edu.to ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {edu.degree}
      </p>
      <p>
        <strong>Field of Study: </strong> {edu.fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong> {edu.description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEducation;
