import React, { useEffect, useState, useRef } from "react";
import Card from "../Card/Card";
import "./HomePage.css";

function HomePage() {
  const buttonRef = useRef(null);
  const SearchRef = useRef(false);
  const [Users, setUsers] = useState([]);
  const [UsersList, setUsersList] = useState([]);
  const [Query, setQuery] = useState("");

  useEffect(() => {
    const endpoint = `https://api.github.com/users?since=0&per_page=15`;
    fetchUsers(endpoint);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(SearchRef.current);
    if (Query !== "") {
      setUsers(searchUsers(Query));
    } else {
      setUsers(UsersList);
    }
  }, [Query]);

  const searchUsers = (query) => {
    const regExp = new RegExp(`(${query})`, "g");
    return Users.filter((user) => {
      return user.login.match(regExp);
    });
  };

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

  const fetchMoreUsers = () => {
    let endpoint = `https://api.github.com/users?since=${
      Users[Users.length - 1].id
    }&per_page=15`;
    fetchUsers(endpoint);
  };

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
      if (buttonRef && buttonRef.current && !SearchRef.current) {
        buttonRef.current.click();
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      SearchRef.current = false;
    } else {
      SearchRef.current = true;
    }
    setQuery(e.target.value);
  };

  return (
    <div className="home-page">
      <div className="input-container">
        <input
          type="text"
          name="query"
          value={Query}
          onChange={handleChange}
          placeholder="Search Users"
        />
        <div className="search"></div>
      </div>
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
