import styles from './cards.module.css';
import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../Card/Card.jsx';

export default function Cards() {

    const recipes = useSelector(state => state.renderRecipe);

    return (
        <div className={styles.divCards}>
            {!(recipes.length > 0) ? <p className={styles.noDogs} >Oops! there is no dogs around here</p> : recipes.map(c => {
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