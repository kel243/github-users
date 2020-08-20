import React, { useEffect, useState, useRef } from "react";
import Card from "../Card/Card";
import "./HomePage.css";

function HomePage() {
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const searchRef = useRef(false);
  const [Users, setUsers] = useState([]);
  const [UsersList, setUsersList] = useState([]);
  const [Query, setQuery] = useState("");

  // Fetch 15 users initially
  useEffect(() => {
    const endpoint = `https://api.github.com/users?since=0&per_page=15`;
    fetchUsers(endpoint);
  }, []);

  // Event listener for infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  // If search query is not empty, render result of query
  // else, render users fetched from Github API
  useEffect(() => {
    if (Query !== "") {
      setUsers(searchUsers(Query));
    } else {
      setUsers(UsersList);
    }
  }, [Query]);

  // Filter through result returned from the API
  // and return users with logins that contain the query
  const searchUsers = (query) => {
    const regExp = new RegExp(`(${query})`, "g");
    return Users.filter((user) => {
      return user.login.match(regExp);
    });
  };

  // Fetch users and store them in Users for render
  // and UsersList to save the users so they can be re-rendered
  // when the app user isn't searching
  const fetchUsers = (path) => {
    fetch(path)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUsers([...Users, ...response]);
        setUsersList([...Users, ...response]);
      });
  };

  // Fetch more users starting from the id of the final user previously fetched
  const fetchMoreUsers = () => {
    let endpoint = `https://api.github.com/users?since=${
      Users[Users.length - 1].id
    }&per_page=15`;
    fetchUsers(endpoint);
  };

  // Click invisible button to fetch more users if app user is at bottom of page
  // and is not searching
  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      if (buttonRef && buttonRef.current && !searchRef.current) {
        buttonRef.current.click();
      }
    }
  };

  // Set Search state to false if search input is empty
  // Set Search state to true if search input is not empty
  // Set Query to current value of search input
  const handleChange = (e) => {
    if (e.target.value === "") {
      searchRef.current = false;
    } else {
      searchRef.current = true;
    }
    setQuery(e.target.value);
  };

  // Since search input has two way binding, there is no submit button
  // Instead, submitting the form will unfocus the input for better UX
  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.blur();
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            name="query"
            value={Query}
            onChange={handleChange}
            placeholder="Search Users"
          />
          <div className="search"></div>
        </div>
      </form>
      <div className="users">
        {Users &&
          Users.map((user, index) => {
            return (
              <Card
                login={user.login}
                id={user.id}
                avatar={user.avatar_url}
                key={index}
              />
            );
          })}
      </div>
      <div style={{ display: "none" }}>
        <button ref={buttonRef} className="loadMore" onClick={fetchMoreUsers}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default HomePage;
