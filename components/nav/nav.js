import React from "react";
import styles from "./nav.module.css";

const nav = () => {
  return (
    <div className={styles.nav}>
      <img
        className={styles.navLogo}
        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
        alt='Instagram Logo'
      />
    </div>
  );
};

export default nav;
