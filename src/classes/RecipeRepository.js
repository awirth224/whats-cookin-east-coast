import Recipe from '../classes/Recipe'

class RecipeRepository {
  constructor(ingredientData,data) {
    this.ingredientData = ingredientData
    this.data = data
    this.recipesList = this.createRecipesClassArray()
  }

  createRecipesClassArray() {
    let recipesClassArray = []
    this.data.forEach((recipe) => {
      let modifiedRecipeClass = new Recipe(this.ingredientData, recipe)
      recipesClassArray.push(modifiedRecipeClass)
    })
    return recipesClassArray
  }
  
  filterByTag(tag) {
    let tagFilterResults = this.recipesList.filter((recipe) => {
      let upperCaseTags = recipe.tags.map(word => word.toUpperCase())
      if (upperCaseTags.includes(tag.toUpperCase())) {
        return true
      }
    })
    return tagFilterResults
  }

  filterByName(name) {
    let nameFilterResults = this.recipesList.filter(recipe => recipe.name.toUpperCase().includes(name.toUpperCase()))
    return nameFilterResults
  }
}

export default RecipeRepository;
