
function init() {
    const form = document.getElementById("recipeForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const recipeName = document.getElementById('recipe');
        const resultDiv = document.querySelector('.result');

        if (!recipeName || !resultDiv) {
            console.log("___Error", "Username or result not found");
            return;
        } 

        const recipeNameValue = recipeName.value.trim();

        resultDiv.innerHTML = "";

        if (recipeNameValue === "") {
            resultDiv.innerHTML = "Please enter a recipe name";
            return;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeNameValue}`);

        if(!response.ok) {
            if (response.status === 404) {
                resultDiv.innerHTML = "Recipe not found";    
            } else {
                resultDiv.innerHTML = "An error occurred";
            }
            return;
        }
    
        const recipe = await response.json();

        resultDiv.innerHTML = "";

        if (recipe.meals) {
            recipe.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                    <p>Category: ${meal.strCategory}</p>
                    <p>Area: ${meal.strArea}</p>
                `;
                resultDiv.appendChild(recipeDiv);
            });
        }

    }

);
}
document.addEventListener("DOMContentLoaded", init);