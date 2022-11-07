const fetchApiUrl = (path) => {
    return fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(`${path} API Error!`));
  };
  
  
  const fetchData = () => {
    return Promise.all([
      fetchApiUrl("ingredients"),
      fetchApiUrl("recipes"),
      fetchApiUrl("users"),
    ]);
  };
  
  export default { fetchData };
