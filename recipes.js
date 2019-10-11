'use strict';

const mongoose = require('mongoose');

const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

/* here the method related to the model, defines model's props'values == it creates one document in database */
const createOneRecipe = async () => {
  try {
    const response = await Recipe.create({
      title: 'Brocoli con patatas',
      level: 'UltraPro Chef',
      ingredients: ['brocoli', 'patatas', 'ajo', 'aceite', 'sal'],
      cuisine: 'veggie',
      dishType: 'Dish',
      duration: 30,
      creator: 'Anna'
    })
    console.log(response.title);
  }
  catch(error) {
    console.log(error);
  }
}

// insert list of recipes from data.js 
const addManyRecipes = async (data) => {
  try {
    const response = await Recipe.insertMany(data);
    response.forEach((recipe) => console.log(recipe.title))
  }
  catch(error) {
    console.log(error);
  }
}

const updateDurationRecipe = async (title, duration) => {
  try{
    const response = await Recipe.findOneAndUpdate({title},{duration: 100 },{new: true})
    console.log(response)
  }
  catch(error) {
    console.log(error);
  }
}

const deleteOneRecipe = async (title) => {
  try{
  const response = await Recipe.deleteOne({title})
    console.log(response)
  }
  catch(error) {
    console.log(error);
  }
}

const emptyCollection = async () => {
  await Recipe.deleteMany();
  console.log('collectio delete')
}
// Elimina toda la coleection

const doExercise = assync () => {
await emptyCollection();
await createOneRecipe();
await addManyRecipes(data);
await updateDurationRecipe('Rigatoni alla Genovesa', 100)
await deleteOneRecipe('Carrot Cake')
mongoose.connection.close()
}
doExercise()