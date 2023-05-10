import styles from './nav.module.css';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getRecipeApi, getRecipeDB, searchRecipe, filterAz, filterScore, renderRecipeCards } from '../../redux/actions/index.js';


export default function Nav() {

    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe);

    const [dataApi, setDataApi] = useState(false);
    const [dataBase, setDataBase] = useState(false);
    const [searchRecipeState, setSearchRecipeState] = useState(false);
    const [recipeInput, setRecipeInput] = useState('');
    const [healthScoreFirst, setHealthScoreFirst] = useState(false);
    const [orderhandleAZFirts, setOrderhandleAZFirts] = useState(false);

    // Mostramos por datos de la api
    function handleApi() {
        setDataApi(true);
    }

    useEffect(() => {
        if (dataApi) {
            dispatch(getRecipeApi());
            setDataApi(false);
        }
    }, [dispatch, dataApi]);

    // Mostramos datos de la bse de datos
    function handleDB() {
        setDataBase(true);
    }

    useEffect(() => {
        if (dataBase) {
            dispatch(getRecipeDB());
            setDataBase(false);
        }
    }, [dispatch, dataBase]);

    // Busqueda por input
    function handleInput(event) {
        setRecipeInput(event.target.value);
    }

    function handleSearch() {
        setSearchRecipeState(true);
    }

    useEffect(() => {
        if(searchRecipeState) {
            dispatch(searchRecipe(recipeInput));
            setSearchRecipeState(false);
        }
    }, [dispatch, searchRecipeState , recipeInput]);

    // Ordenamiento de handleHealthScore
    function handleHealthScore() {
        if(!healthScoreFirst){
            setHealthScoreFirst(true);
        }else{
            setHealthScoreFirst(false);
        }
        console.log("HealthScore")
    }

    useEffect(() => {
        if(healthScoreFirst){
            console.log("primer Handle")
            dispatch(filterScore(recipe,true));
        }else {
            console.log("Segundo Handle")
            dispatch(filterScore(recipe, false));
        }
        dispatch(renderRecipeCards(recipe));
    }, [dispatch, healthScoreFirst, recipe]);

    // Ordenamiento por orden alfabetico
    function handleAZ() {
        if(!orderhandleAZFirts){
            setOrderhandleAZFirts(true);
        }else{
            setOrderhandleAZFirts(false);
        }
        console.log("handleAZ")
    }

    useEffect(() => {
        if(orderhandleAZFirts){
            console.log("primer Handle")
            dispatch(filterAz(recipe,true));
            dispatch(renderRecipeCards(recipe));
        }else{
            console.log("Segundo Handle")
            dispatch(filterAz(recipe, false));
            dispatch(renderRecipeCards(recipe));
        }
        
    }, [dispatch, orderhandleAZFirts, recipe]);
    // console.log(recipe);

    return (
        <div className={styles.divNav}>
            <ul className={styles.containerList} >

                <li>
                    <button className={styles.bttnApi} onClick={handleApi} >api</button>
                    <button className={styles.bttnDb} onClick={handleDB} >db</button>
                </li>
                <li>
                    <input
                        name='SearchInput'
                        type='search'
                        placeholder='Ex: Pozole'
                        className={styles.inpSearch}
                        onChange={(e) => handleInput(e)}
                        value={recipeInput}
                    />
                    <button className={styles.searchBttn}
                        onClick={handleSearch}
                    >Search</button>
                </li>
                <li>
                    <button onClick={handleHealthScore} className={styles.buttonHealthScore} >HealthScore</button>
                </li>
                <li>
                    <button onClick={handleAZ} className={styles.buttonHealthScore} >A-Z</button>
                </li>
                <li>
                    <NavLink to='/favorites' >
                        <input type="button" value='⭐ Favorites' className={styles.favoritesBttn} />
                    </NavLink>
                </li>
            </ul>
            <NavLink to='/createRecipe'>
                <button className={styles.formBttn} >Create Dog</button>
            </NavLink>
        </div>
    );
}