'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true,
    unique: true
  }, 

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  
  ingredients: {
    type: Array
  },
  
  cuisine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg' 
  },
  
  duration: {
    type: Number,
    min: 0
  },
  
  creator: {
    type: String
  },

  created: {
    type: Date,
    default: new Date()
  }
})

/* CREATE THE MODEL */
/* Here the model w/its props: we define a const & link to the model's name == related to the Schema*/
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;