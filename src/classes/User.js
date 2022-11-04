class User {
  constructor(data) {
    this.name = data.name
    this.id = data.id
    this.pantry = data.pantry
    this.favorites = []
  }

  addToFavorites(recipe) {
    this.favorites.push(recipe)
    return this.favorites
  }

  removeFromFavorites(recipe) {
    let indexFound = this.favorites.find((favRecipes) => {
      favRecipes === recipe
    })
    this.favorites.splice(indexFound, 1)
    return this.favorites
  }

  filterFavsByTag(tag) {
    let favByTagResult = this.favorites.filter((favorites) => {
      let upperCaseTags = favorites.tags.map(word => word.toUpperCase())
      if (upperCaseTags.includes(tag.toUpperCase())){
        return true
      }
    })
    return favByTagResult
  }

  filterFavsByName(name) {
     let favByNameResult = this.favorites.filter(favorites => favorites.name.toUpperCase().includes(name.toUpperCase()))
    return favByNameResult
    
  }

// we want to access a recipe.ingredients and the user.pantry.ingredients
// compare the amount of ingredients in the recipe vs pantry
// if ingredient or equal to or greater than recipe ingredients then subtract ing used
// if not return an array of ingredients needed and the amount
// compare this.favorites to this.pantry
// this.favorites.recipeIngredients.id vs this.pantry.ingredient && this.favorites.quantity.amount vs this.pantry.amount
// if all ingredients from recipe are found in pantry then move on to next function that subtracts amounts
// if not all ingredients from recipe are found in pantry then return an array of the ingredients not found
// ^^ make a new array of different length -> reduce -> acc [] -> adds a missing ingredient each iteration

compareIngredientAmounts(lemons) {
  // console.log('PANTRY', this.pantry)
  let matchIngredients = lemons.recipeIngredients.filter(item => {
    console.log('ITEM', item)
    let givenRecipeIngId = item.id
    console.log('GIVENRECIPE', givenRecipeIngId)
    let ingredientFound = this.pantry.find((ingredient, givenRecipeIngId) => {
      ingredient.id === givenRecipeIngId
    })
    // console.log('INGREDIENTFOUND', ingredientFound)
    // console.log('MATCHEDING', matchIngredients)
    // return ingredientFound 
  })
// console.log('THIS.FAVOIRTES', lemons.recipeIngredients)
// console.log('THIS.PANTRY', this.pantry)
}


subtractFromPantry(recipe) {
  const formattedRecipe = recipe.recipeIngredients.reduce((formattedList, item) => {
    formattedList[item.id] = item.quantity.amount
    return formattedList
  },{})
  this.pantry = (this.pantry.map(item => {
    if (formattedRecipe[item.ingredient]) {
      return {ingredient: item.ingredient, amount: item.amount - formattedRecipe[item.ingredient]}
    } else { 
      return item
    }
  }))
}

}



 


export default User