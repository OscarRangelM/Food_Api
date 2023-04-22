const axios = require("axios");
const { Diets, Recipe } = require('../db.js');
const { API_KEY } = process.env;

const getDietsController = async () =>{

    const dietsDb = await Diets.findAll();
    if(dietsDb.length > 1) return dietsDb;

    const dietsApi =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    const dataDietsApi = dietsApi.data.results;

    const listDiets = dataDietsApi.map(res => res.diets);
    const allDiets = [];
    listDiets.forEach(e => {
        e?.forEach(res => {
            allDiets.push(res);
        })
    });

    let result = allDiets.filter((item, index) =>{
        return allDiets.indexOf(item) === index;
    })

    console.log(result);
    
    result.map(async (e) => {
        let newDiet = await Diets.create({
            name: e.toLowerCase(),
        })
    })
    return "Nuevas dietas creados";

}

module.exports = { getDietsController };