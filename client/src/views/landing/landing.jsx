import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./landing.module.css";

function Landing() {
 
  
  return (
    <div className={styles.landing}>
      <div>
        <Link to="/home">
            <button className={styles.button}>home</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;