import Ingredients from '../classes/Ingredients'
import fetchData from '../apiCalls'

class Recipe {
    constructor(recipe, apiData) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = new Ingredients(apiData.data.ingredientsData)
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
        this.modifiedIngredients = this.ingredients.modifiedData
    }
    ingredientsNeeded() {
        let ingredientsNeeded = [];
        this.modifiedIngredients.forEach((ingredient) => {
                ingredientsNeeded.push(ingredient.name)
        })       
        return ingredientsNeeded
    }

    getIngredientsCost() {
        var totalIngredientCost = this.modifiedIngredients.reduce(function(acc,item){
            let ingredientCost = item.estimatedCostInCents * item.quantity.amount
            return acc + ingredientCost
        }, 0)
       return totalIngredientCost
    }

    getInstructions() {
        return this.instructions
    }
};

export default Recipe;