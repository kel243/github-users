import React, { useEffect, useState } from "react";
import CardImage from "../Card/CardImage/CardImage";
import RepoCard from "../RepoCard/RepoCard";
import "../HomePage/HomePage.css";
import "./UserPage.css";

function UserPage(props) {
  const [User, setUser] = useState([]);
  const [Repos, setRepos] = useState([]);
  const [Followers, setFollowers] = useState([]);

  // Fetch Github user based on the username found in url params
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.match.params.userName}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUser(response);
      });
  }, []);

  // Fetch 20 repos for Github user based on the username found in url params
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${props.match.params.userName}/repos?per_page=20`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setRepos(response);
      });
  }, []);

  // Fetch 20 followers for Github user based on the username found in url params
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${props.match.params.userName}/followers?per_page=20`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFollowers(response);
      });
  }, []);

  return (
    <div className="user-page">
      <div className="user-container">
        <CardImage avatar={User.avatar_url} />
        <h2 className="user-heading">{User.login}</h2>
      </div>
      <div className="user-container user-container-dark">
        <h2 className="user-heading">Repositories</h2>
        <div className="user-repos">
          {Repos &&
            Repos.map((repo) => {
              return <RepoCard name={repo.name} />;
            })}
        </div>
      </div>
      <div className="user-container user-container-dark">
        <h2 className="user-heading">Followers</h2>
        <div className="user-followers">
          {Followers &&
            Followers.map((repo) => {
              return <p className="user-follower">{repo.login}</p>;
            })}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
