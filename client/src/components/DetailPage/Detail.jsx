import styles from './detail.module.css';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipeById } from '../../redux/actions/index.js';
import Nav from '../Nav/Nav.jsx';

export default function Detail() {

    const dispatch = useDispatch();
    const {detailId} = useParams();
    const state = useSelector(state => state.recipeDetail);

    const diets = state.diets;

    useEffect(() => {
        dispatch(searchRecipeById(detailId));
    },[dispatch, detailId]);

    console.log(state);

    return (
        <div className={styles.divDetail}>
             <Nav />
            <section className={styles.cardDetail} >
                <img src={state.image} alt={state.name} className={styles.detailImg} />
                <div className={styles.sectionInfoDetial} >
                    <h4 className={styles.detailName}>{state.name}</h4>
                    <h5 className={styles.detailId}>{state.id}</h5>
                    <h5 className={styles.detailSummary} >{state.summary}</h5>
                    <h5 className={styles.detailHealthScore} >{state.healthScore}</h5>
                    <h5 className={styles.detailInstructions} >{state.instructions}</h5>
                    <ul className={styles.detailUl}>
                        {diets?.map(result => {
                            return (<li className={styles.detailListElement}>{result}</li>);
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
}