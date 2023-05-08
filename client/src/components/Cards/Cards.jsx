import styles from './cards.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

import Card from '../Card/Card.jsx';

import { renderRecipeCards } from '../../redux/actions/index.js';

export default function Cards() {

    const dispatch = useDispatch();

    const recipe = useSelector(state => state.recipe);
    
    useEffect(() => {
        dispatch(renderRecipeCards(recipe));
    },[dispatch, recipe]);
    // console.log(render);
    
    const render = useSelector(state => state.renderRecipe);
    // console.log(render?.length);
    return (
        <div className={styles.divCards}>
            {!(render?.length > 0) ? <p className={styles.noDogs} >Oops! there is no recipe around here</p> : render.map(c => {
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