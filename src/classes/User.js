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
    let favByTagResult = this.favorites.filter(favorites => favorites.tags.includes(tag))
    return favByTagResult
  }

  filterFavsByName(name) {
     let favByNameResult = this.favorites.filter(favorites => favorites.name.includes(name))
    return favByNameResult
    
  }

//we want to access a recipe.ingredients and the user.pantry.ingredients
//compared the amount of ingredients in the recipe vs pantry
//if ingredient or equal to or greater than recipe ingredients then work
// if not return the array of ingredients needed and the amount
//



subtractFromPantry(recipe){
  const formattedRecipe = recipe.recipeIngredients.reduce((formattedList, item) => {
    formattedList[item.id] = item.quantity.amount
    return formattedList
  },{})
  this.pantry = (this.pantry.map(item => {
    if(formattedRecipe[item.ingredient]){
      return {ingredient: item.ingredient, amount: item.amount - formattedRecipe[item.ingredient]}
    } else {
      return item
    }
  }))
}

}








 




 


export default User