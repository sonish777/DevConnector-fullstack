import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";
import Moment from "react-moment";

const CommentItem = (props) => {
  const { comment, postId, auth } = props;
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href={`/profile/${comment.user}`}>
          <img className="round-img" src={`/img/${comment.avatar}`} alt="" />
          <h4>{comment.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
        </p>
        {!auth.loading && comment.user === auth.user._id && (
          <button
            className="btn btn-danger"
            onClick={() => props.removeComment(postId, comment._id)}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { removeComment })(CommentItem);
