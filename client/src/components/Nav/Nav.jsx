import styles from './nav.module.css';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getRecipeApi, getRecipeDB, searchRecipe, filterAz, filterScore} from '../../redux/actions/index.js';


export default function Nav() {

    const dispatch = useDispatch();

    const [dataApi, setDataApi] = useState(false);
    const [dataBase, setDataBase] = useState(false);
    const [searchRecipe, setSearchRecipe] = useState(false);

    // Mostramos por datos de la api
    function handleApi() {
        setSearchRecipe(false);
        setDataBase(false);
        setDataApi(true);
    }

    useEffect(() => {
        if(dataApi){
            dispatch(getRecipeApi());
        setDataApi(false);
        }
    }, [dispatch, dataApi]);

    // Mostramos datos de la bse de datos
    function handleDB(){
        setSearchRecipe(false);
        setDataBase(true);
        setDataApi(false);
    }

    useEffect(() => {
        if(dataBase){
            dispatch(getRecipeDB());
            setDataBase(false);
        }
    },[dispatch, dataBase]);

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
                    // onChange={(e) => handleInput(e)}
                    // value={dog}
                    />
                    <button className={styles.searchBttn}
                    // onClick={handleSearch}
                    >Search</button>
                </li>
                <li>
                        <NavLink to='/favorites' >
                            <input type="button" value='⭐ Favorites' className={styles.favoritesBttn} />
                        </NavLink>
                    </li>
            </ul>
            <NavLink to='/createdog'>
                <button className={styles.formBttn} >Create Dog</button>
            </NavLink>
        </div>
    );
}