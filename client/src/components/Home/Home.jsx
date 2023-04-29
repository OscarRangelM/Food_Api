import React from 'react';
import styles from './home.module.css';

import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import Pages from '../Pagination/Pages.jsx';

// import { useSelector } from 'react-redux';

export default function Home() {
    return (
    <div className={styles.divHome} >
        <Nav />
        <Cards />
        <Pages />
    </div>
    );
}