import styles from './form.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { validate } from './validation.js';
import { createRecipe } from '../../redux/actions/index.js';

export default function Form() {

    const state = useSelector(state => state.diets);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: 0,
        instructions: '',
        diets1: '',
        diets2: '',
        diets3: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: '',
        instructions: '',
        diets1: '',
        diets2: '',
    });

    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value,
        })
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createRecipe(inputs));
        setInputs({
            name: '',
            image: '',
            summary: '',
            healthScore: 0,
            instructions: '',
            diets1: '',
            diets2: '',
            diets3: '',
        })
    }

    return (
        <div className={styles.divForm}>
            <div className={styles.sectionBack} >
                <NavLink to='../home' >
                    <button className={styles.bttnBack} >◀ Home</button>
                </NavLink>
            </div>
            <form className={styles.formSection} onSubmit={handleSubmit} >

                <label htmlFor="name">Name*</label>
                <input type="text" className={styles.inputName} name="name" onChange={handleChange} value={inputs.name} />
                {errors.name && <p>{errors.name}</p>}

                <label htmlFor="image">Image*</label>
                <input type="text" className={styles.inputImage} name="image" onChange={handleChange} value={inputs.image} />
                {errors.image && <p>{errors.image}</p>}

                <label htmlFor="summary">Summary*</label>
                <input type="text" className={styles.inputSummary} name="summary" onChange={handleChange} value={inputs.summary} />
                {errors.summary && <p>{errors.summary}</p>}

                <label htmlFor="healthScore">HealthScore*</label>
                <input type="number" className={styles.inputHealthScore} name="healthScore" onChange={handleChange} value={inputs.healthScore} />
                {errors.healthScore && <p>{errors.healthScore}</p>}

                <label htmlFor="instructions">Instructions*</label>
                <input type="text" className={styles.inputInstructions} name="instructions" onChange={handleChange} value={inputs.instructions} />
                {errors.instructions && <p>{errors.instructions}</p>}

                <label htmlFor="diets">Diets*</label>
                <select type='select' placeholder='Diets' name="diets1" className={styles.inputDiets} onChange={handleChange} value={inputs.diets1}>
                    <option>None</option>
                    {state?.map(c => {
                        return (
                            <option value={c.name} className={styles.optionDiet} key={c.id} >{c.name}</option>
                        )
                    })}
                </select>
                {errors.diets1 && <p>{errors.diets1}</p>}

                <select type='select' placeholder='Diets' name="diets2" className={styles.inputDiets} onChange={handleChange} value={inputs.diets2}>
                    <option>None</option>
                    {state?.map(c => {
                        return (
                            <option value={c.name} className={styles.optionDiet} key={c.id} >{c.name}</option>
                        )
                    })}
                </select>
                {errors.diets2 && <p>{errors.diets2}</p>}

                <select type='select' placeholder='Diets' name="diets3" className={styles.inputDiets} onChange={handleChange} value={inputs.diets3}>
                    <option>None</option>
                    {state?.map(diet => {
                        return (
                            <option value={diet.name} className={styles.optionDiet} key={diet.id} >{diet.name}</option>
                        )
                    })}
                </select>

                <input type="submit" className={styles.bttnSubmit} value="Submit" />

            </form>

        </div>
    );
}