import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
import styles from "../header/Header.module.scss";

const Header = () => {
  const [menu, setMenu] = useState(true);

  return (
    <section className={styles.header}>
      <nav className={styles.navbar}>
        <h3>User Generator</h3>

        <div className={styles.menu} onClick={() => setMenu(!menu)}>
          {menu ? <AiOutlineMenu /> : <AiOutlineClose />}
        </div>
      </nav>

      <div className={styles.home}>
        <h1>Generate Random Users</h1>
        <AiOutlineArrowDown />
        <Link to='/users'>Click Here</Link> 
      </div>
    </section>
  );
};

export default Header;
