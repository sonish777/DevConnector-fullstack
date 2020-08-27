import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../ui/Spinner";

class ProfileGithub extends Component {
  componentDidMount() {
    this.props.getGithubRepos(this.props.username);
  }

  render() {
    // console.log(this.props);
    const repos = this.props.repos;
    return (
      <div className="profile-github">
        <h2 className="text-primary my-1">
          Github Repos for: {this.props.username}
        </h2>
        {repos.length <= 0 ? (
          <Spinner />
        ) : (
          repos.map((repo, i) => (
            <div key={i} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGithubRepos: (username) => dispatch(getGithubRepos(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
