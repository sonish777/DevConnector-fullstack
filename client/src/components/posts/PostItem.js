import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = (props) => {
  const { post, auth, showActions } = props;

  const checkLike = () => {
    let styl = "btn btn-light";
    post.like.forEach((el) => {
      console.log("--------------");
      console.log(el.user);
      console.log(auth.user._id);
      if (el.user._id === auth.user._id) {
        console.log("true");
        styl = "btn color-blue";
      }
    });
    return styl;
  };
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={`/img/${post.avatar}`} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => props.addLike(post._id)}
              type="button"
              className={checkLike()}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              {post.like.length > 0 && <span>{post.like.length}</span>}
            </button>
            <button
              type="button"
              onClick={() => props.removeLike(post._id)}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${post._id}`} className="btn btn-primary">
              Discussion{" "}
              {post.comments.length > 0 && (
                <span className="comment-count">{post.comments.length}</span>
              )}
            </Link>
            {!auth.loading && post.user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => props.deletePost(post._id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (id) => dispatch(addLike(id)),
    removeLike: (id) => dispatch(removeLike(id)),
    deletePost: (id) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
