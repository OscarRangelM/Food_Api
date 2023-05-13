import styles from './detail.module.css';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipeById } from '../../redux/actions/index.js';
import { NavLink } from 'react-router-dom';

export default function Detail() {

    const dispatch = useDispatch();
    const { detailId } = useParams();
    const state = useSelector(state => state.recipeDetail);

    // const diets = state.diets;

    useEffect(() => {
        dispatch(searchRecipeById(detailId));
    }, [dispatch, detailId]);

    console.log(state);

    return (
        <div className={styles.divDetail}>
            <div className={styles.sectionBack} >
                <NavLink to='../home' >
                    <button className={styles.bttnBack} >◀ Home</button>
                </NavLink>
            </div>
            <section className={styles.cardDetail} >
                <img src={state.image} alt={state.name} className={styles.detailImg} />
                <div className={styles.sectionInfoDetial} >
                    <h4 className={styles.detailName}>{state.name}</h4>
                    <p className={styles.detailId}>ID: {state.id}</p>
                    <div dangerouslySetInnerHTML={{__html: state.summary} }></div>
                    <p className={styles.detailHealthScore} >Health Score: {state.healthScore}</p>
                    <p className={styles.detailInstructions} >{state.instructions}</p>
                    <p className={styles.detailsIdTitle}>Diets:</p>
                    <ul className={styles.detailUl}>
                        {state.diets?.map(result => {
                            return (<li className={styles.detailListElement}>{result}</li>);
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
}