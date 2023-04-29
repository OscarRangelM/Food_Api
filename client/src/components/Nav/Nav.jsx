import styles from './nav.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

/*
SearchBar: un input de búsqueda para encontrar recetas por nombre.
Botones/Opciones para filtrar por tipo de dieta, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (health score).
*/

export default function Nav() {
    return (
        <div className={styles.divNav}>
            <ul className={styles.containerList} >

                <li>
                    <button className={styles.bttnApi} >api</button>
                    <button className={styles.bttnDb} >db</button>
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