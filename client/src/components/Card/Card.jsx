import styles from './card.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

import Details from '../DetailPage/Detail.jsx';

import { useState, useEffect } from 'react';
import { addFavorite, deleteFavorite } from '../../redux/actions/index.js';
import { useDispatch } from 'react-redux';

export default function Card(props) {

    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false);

    function handleFavorite() {
        if (favorite) {
            setFavorite(false);
            dispatch(deleteFavorite(props.id));
        } else {
            setFavorite(true);
            dispatch(addFavorite(props));
        }
    }

    return (
        <div className={styles.divCard}>
            {
                favorite ?
                    (<button onClick={handleFavorite} className = {styles.favButton} >⭐</button>):
                    (<button onClick={handleFavorite} className = {styles.favButton}>☆</button>)
            }
            <img src='https://cdn.leonardo.ai/users/09a168ab-d3d6-4a5f-9631-cc5cb3cdec2c/generations/6c640b86-2b0f-4094-9e52-b4b7c0a618c6/Leonardo_Creative_carne_preparada_0.jpg' alt='Carne en caldo' className={styles.recipeImg} />
            <h4 className={styles.recipeName} >Caldo de carne</h4>
            <h5 className={styles.recipeDiets} >Diets</h5>
            <div className={styles.containerDiets} >
                <p className={styles.diets} >Vegana</p>
                <p className={styles.diets} >Vegetariana</p>
                <p className={styles.diets} >Saludable</p>
            </div>
            <NavLink to='/detail' className={styles.bttnDetails}>
                <p>More details</p>
            </NavLink>
        </div>
    );
}