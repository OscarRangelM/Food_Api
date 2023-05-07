import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './home.module.css';

import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import Pages from '../Pagination/Pages.jsx';

import { getDiets, getRecipeApi} from '../../redux/actions/index.js';

export default function Home() {

    const dispatch = useDispatch();
    const [defaultRecipe, setDefaultRecipe] = useState(true);

    useEffect(() =>{
        if(defaultRecipe) {
            dispatch(getDiets());
            dispatch(getRecipeApi());
            setDefaultRecipe(false);
        }
    }, [dispatch, defaultRecipe]);

    return (
    <div className={styles.divHome} >
        <Nav />
        <Cards />
        <Pages />
    </div>
    );
}