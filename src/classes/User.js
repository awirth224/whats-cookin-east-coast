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

  checkPantry(recipe) {
    let match = 0;
    recipe.recipeIngredients.forEach(recipeIngredient => {
      this.pantry.forEach(pantryIngredient => {
        console.log("recipeIngredient", recipeIngredient)
        console.log("pantryIngredient", pantryIngredient)
        if (recipeIngredient.id === pantryIngredient.ingredient && pantryIngredient.amount >= recipeIngredient.quantity.amount) {
          match += 1;
      }
    })
  })
  console.log(this.pantry)
    return match === recipe.recipeIngredients.length;
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