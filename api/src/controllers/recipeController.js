const axios = require("axios");
const { Diets, Recipe } = require('../db.js');
const { API_KEY } = process.env;

const dataClean = (data) => {
    return data.map((res) => {
        // const stepsRecipe = res.analyzedInstructions[0];
        // console.log(Array.isArray(steps));
        return {
            id: res.id,
            name: res.title,
            image: res.image,
            summary: res.summary,
            healthScore: res.healthScore,
            analyzedInstructions: res.analyzedInstructions,
            diets: res.diets,
        }
    })
}

const getRecipeController = async () => {
    const reciepDB = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
        }
    });

    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    let reciepeApiData = recipeApi.data.results;

    reciepeApiData = dataClean(reciepeApiData);

    return [...reciepDB, ...reciepeApiData];

};
const getIdRecipe = async (id, source) => { 
    id = source === "api" ? parseInt(id) : id;
    
    if(source === "api"){
        const recipeIdApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        let recipeApiData = [];
        recipeApiData.push(recipeIdApi.data);
        console.log(recipeApiData);
        const recipeCleanData = dataClean(recipeApiData);
        return recipeCleanData;
    }


 };
const getRecipeName = async (name) => {
    if(name.search("_") > 0) name = name.replaceAll("_", " ");

    let recipeDB = await Recipe.findAll({
        where: {
            name: name.toLowerCase(),
        },
        include: {
            model: Diets,
            attributes: ["name"],
        }
    });

    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    let reciepeApiData = recipeApi.data.results;

    reciepeApiData = dataClean(reciepeApiData);

    return [...recipeDB, ...reciepeApiData];
 };
const createRecipe = async (recipeBody) => {
    const { name, image, summary, healthScore, analyzedInstructions ,diets} = recipeBody;

    const newRecipe = await Recipe.create({name: name.toLowerCase(), image, summary, healthScore, analyzedInstructions });

    const dietsDB = await Diets.findAll({
        where:{
            name: diets
        }
    });
    newRecipe.addDiets(dietsDB);

    return newRecipe;
 };



module.exports = { getRecipeController, getIdRecipe, getRecipeName, createRecipe };