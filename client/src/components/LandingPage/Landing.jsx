import styles from './landing.module.css';
import React from 'react';

import { NavLink } from 'react-router-dom';

export default function Landing() {
    return (
        <div className={styles.divLanding}>
            <div className={styles.divCover}>
                <h1>Tu receterio</h1>
                <NavLink to='/home'>
                    <button className={styles.buttonLanding}>HOME</button>
                </NavLink>
            </div>
        </div>
    );
}