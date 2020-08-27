import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };

  state = {
    text: "",
  };

  onInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.addComment(this.props.postId, this.state);
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={this.onSubmitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={this.state.text}
            onChange={this.onInputChange}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, { addComment })(CommentForm);
