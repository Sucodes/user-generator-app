import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowDown } from 'react-icons/ai';
import styles from '../404/NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.error_page}>
      <h1>Oops! Something went wrong</h1>
      <AiOutlineArrowDown />
      <Link to='/'>Click Here</Link>
    </div>
  )
}

export default NotFound;
