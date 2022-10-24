
const fetchApiUrl = (path) => {
    return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${path}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(`${path} API Error! ${error}`))
  }
  
  
  const fetchData = () => {
    return Promise.all([
      fetchApiUrl("ingredients"),
      fetchApiUrl("recipes"),
      fetchApiUrl("users"),
    ])
    .then((data) => {
        console.log('data', data)
        return {
            ingredientsData: data[0].ingredientsData, 
            recipeData: data[1].recipeData,
            usersData: data[2].usersData
        }
    })
  }
  
//   function getApiData() {
//     fetchData()
//     .then(data => {
//         console.log('newData', data)
//         apiReturnData = data
//         console.log('apiReturn', apiReturnData)
//     })
// }

  
  export default { fetchData }