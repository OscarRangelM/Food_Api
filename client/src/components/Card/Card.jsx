import styles from './card.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { addFavorite, deleteFavorite } from '../../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Card(props) {

    const dispatch = useDispatch();
    const allFavorites = useSelector(state => state.recipeFavorites);
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

    useEffect(() => {
        allFavorites.forEach(fav => {
            if (fav.id === props.id) {
                setFavorite(true);
            }
        });
    });

    const dietsProps = props.diets;
    // console.log(props.healthScore)

    return (
        <div className={styles.divCard}>
            {
                favorite ?
                    (<button onClick={handleFavorite} className={styles.favButton} >⭐</button>) :
                    (<button onClick={handleFavorite} className={styles.favButton}>☆</button>)
            }
            <img src={props.image} alt={props.name} className={styles.recipeImg} />
            <h4 className={styles.recipeName} >{props.name}</h4>
            <p>healthScore: {props.healthScore}</p>
            <h5 className={styles.recipeDiets} >Diets:</h5>
            <div className={styles.containerDiets} >
                {dietsProps?.map(res => {
                    return (<p className={styles.diets} >{res}</p>);
                })
                }
            </div>
            <NavLink to={`/detail/${props.id}`} className={styles.bttnDetails}>
                <p>More details</p>
            </NavLink>
        </div>
    );
}