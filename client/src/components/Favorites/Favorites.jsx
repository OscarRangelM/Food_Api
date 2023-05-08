import styles from './favorites.module.css';
import React from 'react';

import Card from '../Card/Card.jsx';
import { useSelector } from 'react-redux';

export default function Favorites() {

    // const dispatch = useDispatch();

    const recipeFavorites = useSelector(state => state.recipeFavorites);

    return (
        <div className={styles.divFavorites}>
             {!(recipeFavorites?.length > 0) ? <p className={styles.noDogs} >Oops! there is no recipe around here</p> : recipeFavorites.map(c => {
                return (<Card 
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    diets={c.diets}
                />)
            })}
        </div>
    );
}