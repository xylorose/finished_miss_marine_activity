const express = require('express')
const app = express()
const port = 3436
const bodyParser= require('body-parser')

//
// Requirement to set up the exercise
//
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

//
// Let's start the exercise :
// 
// You have a restaurant and you want to manage the menu :
// You need to know which recipe you can sold and which ingredients you need to use,
// you also need to know what is the purchase price of a dish and what is the price you are selling it.
// ------------------------------

let recipes = [
    { id:0, name: 'Spaghetti Bolognese', ingredients:["onion", "spaghetti", "beef", "tomato sauce"], purchasePrice:30, sellingPrice:50},
    { id:1, name: 'Chicken Burger', ingredients:["onion", "tomato", "chicken", "bread", "creamy sauce", "cheese"], purchasePrice:50, sellingPrice:100},
    { id:2, name: 'Chicken curry with rice', ingredients:["rice", "chicken", "salt", "curry pasta"], purchasePrice:45, sellingPrice:70},
    { id:3, name: 'Pizza with peppers', ingredients:["pasta","onion", "peppers", "ham", "tomato sauce", "cheese"], purchasePrice:80, sellingPrice:110}
]

// Question 1 : As a manager you want to fetch all the recipes. 
// Create an HTTP Request :
app.get('/recipes/all',(req,res)=>{
    res.json(recipes);
})


// Question 2 : As a manager you want to get only one recipe depends on its id.
// Create an HTTP Request :
app.get('/recipes/:id',(req,res)=>{
    let get_id= req.params.id 
    let store = recipes.find( recipe =>{
        return recipe.id == get_id;
    })
    
    res.json(store)
    
})

// Question 3 : As a manager you want to modify the selling price of only one recipe.
// Create an HTTP Request :
app.put('/recipes/:id',(req,res)=>{
    let get_ID = req.params.id
    let searchId = recipes.find(recipe => {
        var  result= false
        if (get_ID == req.params.id) {
            recipe.sellingPrice == req.body.price
            result = true;
        }
        return result
    })
    // console.log('searchedID')
    res.json(searchId);
})


// Question 4 : As a manager you want to delete one recipe from the recipes list
// Create an HTTP Request :
app.delete('/recipes/:id',(req,res)=>{
    let ID = req.params.id
    let search = recipes.findIndex(recipe =>{
        return recipe.id == ID
    })
    recipes.splice(search, 1)
    res.json(recipes);
})



// Question 5 : As a manager you want to add a new recipe in the recipes list.
// Create an HTTP Request :
app.post('/recipes',(req,res)=>{
    recipes.push(req.body)
    res.json(recipes);
})


// Question 6 : As a manager you want to get all the recipes which contains a special ingredients. 
// For example you want to know which recipe contains cheese.
// Create an HTTP Request :
app.get('/recipes/ingredients/:ingrd',(req,res)=>{
    let specialIngredients = recipes.filter(recipe =>{
        return recipe.ingredients.includes(req.params.ingrd)
    })
    res.json(specialIngredients);
})



// Question 7 : As a manager you want to get all the recipes' name which contains a special ingredients.
// For example you want to know which recipes' name contains cheese.
// Create an HTTP Request :
app.get('/recipes/name/:ingrd',(req,res)=>{
    let  ingrd_name= req.params.ingrd
    let a = []
    let search_ingrd = recipes.find(recipe =>{
        if(recipe.ingredients.includes(ingrd_name)){
            a.push(recipe.name)
        }
    })
    res.json(a);
})


//
// End of the exercice
// ------------------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


