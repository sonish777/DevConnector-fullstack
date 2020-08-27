import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

class PostForm extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
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
    this.props.addPost(this.state);
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: () => dispatch(addPost()),
//   };
// };

export default connect(null, { addPost })(PostForm);
