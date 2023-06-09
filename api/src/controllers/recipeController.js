const axios = require("axios");
const { Diets, Recipe } = require('../db.js');
const { API_KEY } = process.env;

const dataClean = (data) => {
    return data.map((res) => {
        return {
            id: res.id,
            name: res.title,
            image: res.image,
            summary: res.summary,
            healthScore: res.healthScore,
            diets: res.diets,
        }
    })
}

const dataDB = (array) =>{
    return array.map((res) => {
        const diets = res.Diets.map(e => e.name);

        return {
            id: res.id,
            name: res.name.toLowerCase(),
            image: res.image,
            summary: res.summary,
            healthScore: res.healthScore,
            instructions: res.instructions,
            diets: diets,
        }
    })
}
// instructions
const dataCleanId = (data) => {
    return data.map((res) => {
        return {
            id: res.id,
            name: res.title,
            image: res.image,
            summary: res.summary,
            healthScore: res.healthScore,
            diets: res.diets,
            instructions: res.instructions
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

    const recipeCDB = dataDB(reciepDB);

    return [...recipeCDB, ...reciepeApiData];

};
const getIdRecipe = async (id, source) => {
    id = source === "api" ? parseInt(id) : id;

    if (source === "api") {
        const recipeIdApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        let recipeApiData = [];
        recipeApiData.push(recipeIdApi.data);
        // console.log(recipeApiData);
        const recipeCleanData = dataCleanId(recipeApiData);
        return recipeCleanData;
    }

    let recipeDB = await Recipe.findAll({
        where: {
            id: id,
        },
        include: {
            model: Diets,
            attributes: ['name'],
        }
    });

    recipeDB = dataDB(recipeDB);
    return recipeDB;


};
const getRecipeName = async (name) => {
    if (name.search("_") > 0) name = name.replaceAll("_", " ");

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
    recipeWanted = reciepeApiData.filter((res) => res.name.toLowerCase().search(name.toLowerCase()) != -1 )

    return [...recipeDB, ...recipeWanted];
};
const createRecipe = async (recipeBody) => {
    const { name, image, summary, healthScore, instructions, diets } = recipeBody;

    const newRecipe = await Recipe.create({ name: name.toLowerCase(), image, summary, healthScore, instructions, diets });

    const dietsDB = await Diets.findAll({
        where: {
            name: diets
        }
    });
    newRecipe.addDiets(dietsDB);

    return newRecipe;
};



module.exports = { getRecipeController, getIdRecipe, getRecipeName, createRecipe };