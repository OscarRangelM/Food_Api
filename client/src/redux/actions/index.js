import axios from 'axios';

export const GET_RECIPE_DB = 'GET_RECIPE_DB';
export const GET_RECIPE_API = 'GET_RECIPE_API';
export const GET_DIETS = 'GET_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const SEARCH_RECIPE_BY_ID = 'SEARCH_RECIPE_BY_ID';
export const FILTER_AZ = 'FILTER_AZ';
export const FILTER_SCORE = 'FILTER_SCORE';
export const RENDER_RECIPE = 'RENDER_RECIPE';

export const getRecipeApi = () => {
    return async (dispatch) => {
        try {
            console.log("Se ejecuto la funcion getRecipeDiets");
            let recipeApi = [];
            const recipeApiGet = await axios.get('http://localhost:3001/recipes');
            const recipeApiData = recipeApiGet.data;
            // eslint-disable-next-line array-callback-return
            recipeApiData?.map((e) => {
                if (!isNaN(e.id)) recipeApi.push(e);
            });
            // console.log(recipeApiData);
            return dispatch({
                type: GET_RECIPE_API,
                payload: recipeApi,
            })
        } catch (error) {
            console.log(`Error getDogsApi, ${error}`)
        }
    };
};

export const getRecipeDB = () => {
    return async (dispatch) => {
        try {
            let recipeDb = [];
            const recipeDbGet = await axios.get('http://localhost:3001/recipes');
            const recipeDbData = recipeDbGet.data;
            // eslint-disable-next-line array-callback-return
            recipeDbData?.map((e) => {
                if (isNaN(e.id)) recipeDb.push(e);
            });

            return dispatch({
                type: GET_RECIPE_DB,
                payload: recipeDb,
            });
        } catch (error) {
            console.log(`Error getDogsDb, ${error}`);
        }
    };
};

export const getDiets = () => {
    return async (dispatch) => {
        try {
            console.log("Se ejecuto la funcion diets")
            const dietsGet = await axios.get('http://localhost:3001/diets');
            const dietsData = dietsGet.data;
            // console.log(dietsData);
            return dispatch({
                type: GET_DIETS,
                payload: dietsData,
            });
        } catch (error) {
            console.log(`Error getDiets, ${error}`);
        }
    };
};

export const createRecipe = (inputs) => {

    return async (dispatch) => {
        try {
            const body = {
                name: inputs.name,
                image: inputs.image,
                summary: inputs.summary,
                healthScore: inputs.healthScore,
                diets: inputs.diets,
                instructions: inputs.instructions,
            }

            const createRecipe = await axios.post('http://localhost:3001/recipes', body);

            return dispatch({
                type: CREATE_RECIPE,
                payload: createRecipe,
            })
        } catch (error) {
            console.log(`Error createRecipe, ${error}`);
        }
    };
};

export const addFavorite = (recipe) => {
    return {
        type: ADD_FAVORITE,
        payload: recipe,
    };
};

export const deleteFavorite = (id) => {
    return {
        type: DELETE_FAVORITE,
        payload: id,
    }
};

export const searchRecipe = (name) => {
    return async (dispatch) => {
        try {
            const recipeFind = await axios.get(`http://localhost:3001/recipes/?name=${name.toLowerCase()}`);
            const recipeData = recipeFind.data;

            return dispatch({
                type: SEARCH_RECIPE,
                payload: recipeData,
            });
        } catch (error) {
            console.log(`Error searchRecipe, ${error}`);
        }
    };
};

export const searchRecipeById = (id) => {
    return async (dispatch) => {
        try {
            const recipeFindId = await axios.get(`http://localhost:3001/recipes/${id}`);
            const recipeData = recipeFindId.data;

            return dispatch({
                type: SEARCH_RECIPE_BY_ID,
                payload: recipeData[0],
            })
        } catch (error) {
            console.log(`Error searchRecipeById, ${error}`);
        }
    }
};

export const filterAz = (recipe, value) => {
    return async (dispatch) => {
        try {
            const recipeAsync = await recipe;
            let recipeAz = recipeAsync.sort((x, y) => x.name.localeCompare(y.name));
            if (value) {
                return dispatch({
                    type: FILTER_AZ,
                    payload: recipeAz,
                });
            }

            let recipeZa = recipeAz.reverse();
            return {
                type: FILTER_AZ,
                payload: recipeZa,
            }
        } catch (error) {
            console.log(`Error filterAz, ${error}`);
        }
    }
};

export const filterScore = (recipe, value) => {
    // console.log(recipe);
    return async (dispatch) => {
        try {
            const recipeAsync = await recipe;
            let recipeScore = recipeAsync.sort((x, y) => x.healthScore - y.healthScore);
            if (value) {
                return dispatch({
                    type: FILTER_SCORE,
                    payload: recipeScore
                });
            }

            let recipeScoreMin = recipeScore.reverse();
            return {
                type: FILTER_SCORE,
                payload: recipeScoreMin,
            }
        } catch (error) {
            console.log(`Error filterScore, ${error}`);
        }
    };
};

export const renderRecipeCards = (recipe, number=1) => {
    return async (dispatch) => {
        try {
            const recipeAsync = await recipe;
            console.log("Se ejecuto el render");
            let renderArr = [];
            let initialNumber = number * 9;
            if(recipeAsync?.length > 0) {
                for(let i = initialNumber - 9; i < initialNumber ; i++){
                    if(typeof(recipeAsync[i]) !== 'undefined') {
                        renderArr.push(recipeAsync[i])
                    }else {
                        break;
                    }
                }
            }
            // console.log(renderArr);
            return dispatch({
                type: RENDER_RECIPE,
                payload: renderArr,
            })
        } catch (error) {
            console.log(`Error renderRecipeCards, ${error}`);
        }
    }
};
