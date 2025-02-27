//Imports
import './styles.css';
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';
import fetchData from '../src/apiCalls';
import User from '../src/classes/User'

//QuerySelector
const currentRecipeName = document.querySelector(".current-recipe-name")
const currentRecipeImage = document.querySelector(".current-recipe-image")
const leftRandomImageCard = document.querySelector(".left-random-card")
const middleRandomImageCard = document.querySelector(".middle-random-card")
const rightRandomImageCard = document.querySelector(".right-random-card")
const tagSearchResults = document.querySelector(".tag-search-results")
const nameSearchResults = document.querySelector(".name-search-results")
const selectedRecipeInfo = document.querySelector(".selected-recipe-info")
const savedRecipes = document.querySelector(".saved-recipes")
const favoritesTagSearchResult = document.querySelector(".favorites-tag-search-results")
const favoritesNameSearchResult = document.querySelector(".favorites-name-search-results")


const viewAllRecipesButton = document.querySelector(".view-all-recipes-button")
const homeButton = document.querySelector(".home-button")
const searchButton = document.querySelector(".submit-search-button")
const searchInput = document.querySelector("#searchBar")
const addFavoriteButton = document.querySelector(".add-to-favorites-button")
const favoritesSearchInput = document.querySelector("#searchFavorites")
const searchFavoritesButton = document.querySelector(".submit-search-favorites-button")

const allRecipesView = document.querySelector(".all-recipes-view")
const homeView = document.querySelector(".home-view")
const selectedRecipeView = document.querySelector(".selected-recipe-view")
const searchedRecipeView = document.querySelector(".searched-recipe-view")
const viewSearchedFavorites = document.querySelector(".view-searched-favorites-recipes")
const viewSavedFavorites = document.querySelector(".saved-section")


//Global Variables
let currentRecipe
let randomRecipes
let allRecipes
let selectedRecipe
let ingredientsData
let recipeData
let usersData
let usersList = []
let currentUser

//Functions
const fetchApiCalls = () => {
    apiCalls.fetchData().then(data => {
      ingredientsData = data[0].ingredientsData;
      recipeData = data[1].recipeData;
      usersData = data[2].usersData;

      loadHandler();
    });
  };

const getRandomIndex = array => {
    return Math.floor(Math.random() * array.length);
};

function hideElement (hideThis) {
    hideThis.classList.add("hidden")
}

function showElement (showThis) {
    showThis.classList.remove("hidden")
}

function loadHandler() {
    onLoadRecipe()
    generateRandomRecipes()
    generateAllRecipes()
    generateUsersList()
    generateCurrentUser()
}

function generateCurrentUser() {
    currentUser = new User (usersList[getRandomIndex(usersList)]) 
}

function generateUsersList () {
    usersData.forEach((user) => {
      let userClass = new User (user)
      usersList.push(userClass)
    })
}

function generateAllRecipes () {
    allRecipes = new RecipeRepository(ingredientsData,recipeData)
}

function onLoadRecipe() {
    currentRecipe = new Recipe(ingredientsData, recipeData[getRandomIndex(recipeData)])
    showMainRecipe()
}

function generateRandomRecipes() {
    randomRecipes = []
    let randomRecipe1 = new Recipe(ingredientsData, recipeData[getRandomIndex(recipeData)])
    randomRecipes.push(randomRecipe1)
    let randomRecipe2 = new Recipe(ingredientsData, recipeData[getRandomIndex(recipeData)])
    randomRecipes.push(randomRecipe2)
    let randomRecipe3 = new Recipe(ingredientsData, recipeData[getRandomIndex(recipeData)])
    randomRecipes.push(randomRecipe3)

    showMainRandomRecipes()
}

function showMainRecipe() {
    currentRecipeName.innerHTML = `${currentRecipe.name}`
    currentRecipeImage.innerHTML = `<img class="current-recipe-image" id="${currentRecipe.id}" alt="image of ${currentRecipe.name}" img
    src=${currentRecipe.image}>`
}

function showMainRandomRecipes() {
    leftRandomImageCard.innerHTML = `<img class="left-random-image" id="${randomRecipes[0].id}" img src=${randomRecipes[0].image} alt="image of ${randomRecipes[0].name}" >
    <h1 class="left random-name">${randomRecipes[0].name}</h1>`
    middleRandomImageCard.innerHTML = `<img class="middle-random-image" id="${randomRecipes[1].id}" img src=${randomRecipes[1].image} alt="image of ${randomRecipes[1].name}">
    <h1 class="middle random-name">${randomRecipes[1].name}</h1>`
    rightRandomImageCard.innerHTML = `<img class="right-random-image" id="${randomRecipes[2].id}" img src=${randomRecipes[2].image} alt="image of ${randomRecipes[2].name}">
    <h1 class="right random-name">${randomRecipes[2].name}</h1>`
}

function viewSelectedRecipe() {
    hideElement(homeView)
    hideElement(searchedRecipeView)
    hideElement(allRecipesView)
    showElement(selectedRecipeView)
    showElement(homeButton)
    showElement(viewAllRecipesButton)
    hideElement(viewSavedFavorites)

    showSelectedRecipe()
}

function showSelectedRecipe() {
    selectedRecipeInfo.innerHTML = `
    <section class="selected-recipe-container">
    <img class="selected-recipe-image" img src=${selectedRecipe.image} alt="image of ${selectedRecipe.name}">
    <h1 class="selected name">${selectedRecipe.name}</h1>
    <h2 class="selected cost">Cost: ${selectedRecipe.getIngredientsCost()} cent</h2>
    <h3 class="selected ingredients-list"> Ingredients </h3>
    <h4 class="selected instructions-list"> Instructions </h4>
    </section>`
    showInstructions()
    showIngredients()
}

function showIngredients() {
    const selectedRecipeIngredients = document.querySelector(".ingredients-list")

    selectedRecipe.modifiedData.forEach(element =>
        selectedRecipeIngredients.innerHTML += 
        `<h3 class="ingredient-item">${element.quantity.amount} ${element.quantity.unit} ${element.name} <br></h3>`
    )
}

function showInstructions() {
    const selectedRecipeInstructions = document.querySelector(".instructions-list")

    selectedRecipe.instructions.forEach(element =>
        selectedRecipeInstructions.innerHTML += 
        `<h3 class="instruction-item"> Step: ${element.number} <br>${element.instruction}</h3>`
    )
}

function viewSearchedRecipes() {
    nameSearchResults.innerHTML = ""
    tagSearchResults.innerHTML = ""
    let searchTerm = searchInput.value 
    let tagResults = []
    let nameResults = []
    tagResults = allRecipes.filterByTag(searchTerm)
    nameResults = allRecipes.filterByName(searchTerm)
    if (nameResults.length === 0 && tagResults.length === 0) {
        tagSearchResults.innerHTML = `<h1>There are no results matching what you entered, please try a different search</h1>`
    }
    nameResults.forEach(element => 
        nameSearchResults.innerHTML+= `<h1 class="searched-recipe" id=${element.id}>${element.name}</h1>`)
    tagResults.forEach(element => 
        tagSearchResults.innerHTML+= `<h1 class="searched-recipe" id=${element.id}>${element.name}</h1>`)
    hideElement(selectedRecipeView)
    hideElement(homeView)
    showElement(searchedRecipeView)
    showElement(homeButton)
    hideElement(viewSavedFavorites)

}

function updateFavoritesBySearch() {
    favoritesNameSearchResult.innerHTML = ""
    favoritesTagSearchResult.innerHTML = ""
    let searchTerm = favoritesSearchInput.value 
    let tagResults = []
    let nameResults = []
    tagResults = currentUser.filterFavsByTag(searchTerm)
    nameResults = currentUser.filterFavsByName(searchTerm)
    if (nameResults.length === 0 && tagResults.length === 0) {
        favoritesTagSearchResult.innerHTML = `<h1>There are no results for your search, please try a different search</h1>`
    }
    nameResults.forEach(element => 
        favoritesNameSearchResult.innerHTML+= `<h1 id=${element.id}>${element.name}</h1>`)
    tagResults.forEach(element => 
        favoritesTagSearchResult.innerHTML+= `<h1 id=${element.id}>${element.name}</h1>`)
    hideElement(selectedRecipeView)
    hideElement(homeView)
    hideElement(searchedRecipeView)
    showElement(homeButton)
    showElement(viewSearchedFavorites)
    hideElement(viewSavedFavorites)
}

function addRecipeToFavorites() {
    savedRecipes.innerHTML = ""

    currentUser.favorites.forEach( element =>
        savedRecipes.innerHTML += `
        <h1 id=${element.id}>${element.name}</h1>
        <input type="checkbox" id="cookedRecipe" name="recipe" value="cooked">
        <label for="cooked" class="checkbox-labe">Cooked</>
        `
    )

}

function viewAllRecipes() {
    showElement(allRecipesView)
    allRecipes.recipesList.forEach(element => 
        allRecipesView.innerHTML+= `<h1 class="all-recipe-list" id=${element.id}>${element.name}</h1>`
    )
    hideElement(viewAllRecipesButton)
    hideElement(homeView)
    hideElement(selectedRecipeView)
    showElement(homeButton)
    hideElement(viewSavedFavorites)
}

function viewHome() {
    showElement(homeView)
    showElement(viewAllRecipesButton)
    hideElement(homeButton)
    hideElement(allRecipesView)
    hideElement(selectedRecipeView)
    showElement(viewSavedFavorites)
}

//EventListener
window.addEventListener("load", fetchApiCalls())
homeButton.addEventListener("click", function(event) {
    event.preventDefault()
    viewHome()
})

viewAllRecipesButton.addEventListener("click", function(event) {
    event.preventDefault()
    viewAllRecipes()
})

allRecipesView.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

searchedRecipeView.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

currentRecipeImage.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

leftRandomImageCard.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

middleRandomImageCard.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

rightRandomImageCard.addEventListener("click", function(event) {
    event.preventDefault()
    selectedRecipe = allRecipes.recipesList.find(recipe => recipe.id == event.target.id)
    viewSelectedRecipe()
})

searchButton.addEventListener("click", function(event) {
    event.preventDefault()
    viewSearchedRecipes()
})

addFavoriteButton.addEventListener("click", function(event) {
    event.preventDefault()

    if (currentUser.favorites.includes(selectedRecipe)) {
        let indexOfRecipe = currentUser.favorites.indexOf(selectedRecipe)
        currentUser.favorites.splice(indexOfRecipe, 1)
    } else {
        currentUser.addToFavorites(selectedRecipe)
    }
    addRecipeToFavorites()
})

searchFavoritesButton.addEventListener("click", function(event) {
    event.preventDefault()
    updateFavoritesBySearch()
})