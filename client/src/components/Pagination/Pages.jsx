import styles from './pages.module.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderRecipeCards } from "../../redux/actions/index.js";

export default function Pages() {

    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe);
    const [numPage, setNumPage] = useState(1);

    const pages = Math.ceil(recipe.length / 9);
    const pagesNum = [];
    for(let i = 0; i < pages; i++) pagesNum.push(i+1);
    console.log(numPage);

    function handlePage(e) {
        setNumPage(e);
    }

    function handleArrowLeft() {
        let dif = numPage - 1;
        if(dif > 0) setNumPage(dif);
        else setNumPage(numPage);
    }

    function handleArrowRight(){
        let sum = numPage + 1;
        if(sum <= pages) setNumPage(sum);
        else setNumPage(numPage);
    }

    useEffect(() =>{
        if(numPage > 0 && numPage <= pages){
            dispatch(renderRecipeCards(recipe, numPage));
        }
    },[dispatch, numPage, pages, recipe]);

    return (
        <div className={styles.divPages}>
            <ul>
                <li><button onClick={() => handleArrowLeft()}>◀</button> </li>
                {
                    pagesNum?.map(e => (
                        <li key={e} >
                            <button className={styles.numList} onClick={() => handlePage(e)} >{e}</button>
                        </li>
                    ))
                }
                <li><button onClick={() => handleArrowRight()}>▶</button> </li>
            </ul>
        </div>
    );
}