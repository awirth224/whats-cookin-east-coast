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
// if ingredient is >= recipe ingredients then subtract ingredient amt used
// if not return an array of ingredients needed and the amount
// compare this.favorites to this.pantry
// this.favorites.recipeIngredients.id vs this.pantry.ingredient && this.favorites.quantity.amount vs this.pantry.amount
// if all ingredients from recipe are found in pantry then move on to next function that subtracts amounts
// if not all ingredients from recipe are found in pantry then return an array of the ingredients not found
// ^^ make a new array of different length -> reduce -> acc [] -> adds a missing ingredient each iteration


  // console.log('INGREDIENTFOUND', ingredientFound)
    // return ingredientFound - returns undefined
    // console.log('PANTRY', this.pantry)
    // console.log('ITEM', item)
    // console.log('GIVENRECIPE', givenRecipeIngId)
    // console.log('MATCHEDING', matchIngredients)
    // return ingredientFound 
compareIngredientAmounts(lemons) {
  let ingredientsMissing = []
  lemons.recipeIngredients.forEach(item => {
    let ingredientFound = this.pantry.filter((ingredient) => {
      // console.log("item inside of filter",item)
      // console.log("ingredient inside of filter", ingredient)
      if (ingredient.ingredient === item.id) {
        return true
      }
    })
    console.log("ingredientFound", ingredientFound)
    if (ingredientFound.length !== 0){

      ingredientsMissing.push(ingredientFound)
    }
  })
  console.log("ingredients missing array after forEach",ingredientsMissing)
  return ingredientsMissing

  // let ingredientsNeededInfo = [];
  //       this.recipeIngredients.forEach((ingredient) => {
  //           var info = this.ingredientsMasterList.find( ing => ingredient.id === ing.id)
  //           ingredientsNeededInfo.push({...info,...ingredient})
  //       })
  //       return ingredientsNeededInfo
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