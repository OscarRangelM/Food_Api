import styles from './cards.module.css';
import React from 'react';

import Card from '../Card/Card.jsx';

export default function Cards() {
    return (
        <div className={styles.divCards}>
            <p>Aqui vamos a mostrar todas las tarjetas con las recetas</p>
            <Card />
        </div>
    );
}