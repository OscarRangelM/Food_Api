import {
    GET_RECIPE_DB,
    GET_RECIPE_API,
    GET_DIETS,
    CREATE_RECIPE,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    SEARCH_RECIPE,
    SEARCH_RECIPE_BY_ID,
    FILTER_AZ,
    FILTER_SCORE,
} from '../actions/index.js';

const initialState = {
    recipe: [],
    diets: [],
    recipeFavorites: [],
    recipeDetail: {},
    renderRecipe: [],
}

const rootReducer = (state = initialState, action) => { }

export default rootReducer;