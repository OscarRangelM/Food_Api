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
    RENDER_RECIPE,
} from '../actions/index.js';

const initialState = {
    recipe: [],
    diets: [],
    recipeFavorites: [],
    recipeDetail: {},
    renderRecipe: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPE_API:
            return {
                ...state,
                recipe: action.payload,
            };

        case GET_RECIPE_DB: 
            return {
                ...state,
                recipe: action.payload,
            }

        case GET_DIETS:
            return {
                ...state,
                recipe: action.payload,
            }

        case CREATE_RECIPE:
            return {
                ...state,
                recipe: [...state.recipe, action.payload],
            }

        case ADD_FAVORITE:
            let favorite = [...state.recipeFavorites, action.payload];
            return {
                ...state,
                recipeFavorites: favorite,
            }

        case DELETE_FAVORITE:
            let unfavorite = state.recipeFavorites.filter(e => {
                return e.id !== action.payload;
            });
            return {
                ...state, 
                recipeFavorites: unfavorite,
            }

        case SEARCH_RECIPE:
            return {
                ...state,
                recipe: action.payload,
            }

        case SEARCH_RECIPE_BY_ID:
            return {
                ...state,
                recipeDetail: action.payload,
            }

        case FILTER_AZ: 
            return {
                ...state,
                recipe: action.payload,
            }

        case FILTER_SCORE:
            return {
                ...state,
                recipe: action.payload,
            }

        case RENDER_RECIPE:
            return {
                ...state,
                renderRecipe: action.payload,
            }
        default:
            return state;
    };
};

export default rootReducer;