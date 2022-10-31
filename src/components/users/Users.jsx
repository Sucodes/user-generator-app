import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { ErrorBoundary } from "../../ErrorBoundary";
import styles from "../users/Users.module.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [usersPerPage, setUserPerPage] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = () => {
    // eslint-disable-next-line no-restricted-globals
    setCurrentPage(Number(event.target.id));
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pages = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    console.log(i);
    pages.push(i);
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNext}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrev}>&hellip;</li>;
  }

  const indexOfLastItem = currentPage * usersPerPage;
  const indexOfFirstItem = indexOfLastItem - usersPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=100"
        );
        console.log(response.data.results);
        const data = response.data.results;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getUsers();
  }, []);

  return (
    <ErrorBoundary>
      <ErrorBoundary />
      <section className={styles.users}>
        <h1>Users List</h1>
        <Link to="/">Back</Link>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          currentItems &&
          currentItems.map((user) => {
            return (
            <div key={user.cell} id={user.id.value} className={styles.users_card}>
              <img src={user.picture.thumbnail} alt="" />  
              <p>{user.name.title + ' ' + user.name.first + ' ' + user.name.last}</p>
              <span>{user.dob.age}yrs</span>
            </div>);
          })
        )}
        <div className={styles.pag}>
          <ul>
            <li
                // eslint-disable-next-line eqeqeq
                disabled={currentPage == pages[0] ? true : false}
                onClick={handlePrev}
              >
                Prev
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li
              // eslint-disable-next-line eqeqeq
              disabled={currentPage == pages[5 - 1] ? true : false}
              onClick={handleNext}
            >
              Next
            </li>
          </ul>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Users;
