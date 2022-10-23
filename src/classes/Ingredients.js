import ingredientsData from '../data/ingredients'
// import fetchData  from "../apiCalls";
// import fetchApiUrl from "../apiCalls";
// import apiIngredients from "../apiCalls";


class Ingredients {
    constructor(data) {
        this.data = data
        this.modifiedData = this.combinedIngredients()
    }

    combinedIngredients() {
        let ingredientsNeededInfo = [];
        this.data.forEach((ingredient) => {
            // console.log('fetchData', fetchData())
            var info = ingredientsData.find( ing => ingredient.id === ing.id)
            ingredientsNeededInfo.push({...info,...ingredient})
        })
        return ingredientsNeededInfo
    }
}

        // const fetchApiCalls = () => {
        //     fetchData().then(data => {
        //       let newIngredientsData = data[0].ingredientsData
        // })  
export default Ingredients