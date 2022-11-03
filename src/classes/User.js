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

subtractFromPantry(recipe){
  const formattedRecipe = recipe.recipeIngredients.reduce((formattedList, item) => {
    formattedList[item.id] = item.quantity.amount
    return formattedList
  },{})
  console.log(this.pantry)
  this.pantry = (this.pantry.map(item => {
    if(formattedRecipe[item.ingredient]){
      return {ingredient: item.ingredient, amount: item.amount - formattedRecipe[item.ingredient]}
    } else {
      return item
    }
  }))
  
console.log('after', this.pantry)
}

}








 




 


export default User