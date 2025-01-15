function init() {

    const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?";

    const form = document.getElementById("recipeForm");
    const recipeName = document.getElementById('recipe');
    const resultDiv = document.querySelector('.result');

    const alphaButtons = document.querySelectorAll('.alphaButton');

    // Search by name
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        resultDiv.innerHTML = "";
        if (!recipeName || !resultDiv) {
            console.log("___Error", "Username or result not found");
            return;
        }

        const recipeNameValue = recipeName.value.trim();

        if (recipeNameValue === "") {
            resultDiv.innerHTML = "Please enter a recipe name";
            return;
        }

        if (recipeNameValue) {
            fetch(`${apiUrl}s=${recipeNameValue}`)
                .then(response => {
                    if (response.ok) {
                        return response.json().then(data => {
                            if (data.meals) {
                                recipeResult(data.meals);
                            } else {
                                resultDiv.innerHTML = "No recipes found";
                            }
                        })
                    } else {
                        if (response.status === 404) {
                            resultDiv.innerHTML = "User not found";
                        } else {
                            resultDiv.innerHTML = "An error occurred";
                        }
                        return;
                    }
                })
        }
    });
    
    // Search by alphabet
    alphaButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            resultDiv.innerHTML = "";
            const letter = button.textContent;
            fetch(`${apiUrl}f=${letter}`)
                .then(response => {
                    if (response.ok) {
                        return response.json().then(data => {
                            if (data.meals) {
                                recipeResult(data.meals);
                            } else {
                                resultDiv.innerHTML = "No recipes found";
                            }
                        })
                    } else {
                        if (response.status === 404) {
                            resultDiv.innerHTML = "User not found";
                        } else {
                            resultDiv.innerHTML = "An error occurred";
                        }
                        return;
                    }
                })
        });
    });

    // Function to display recipe results
    function recipeResult(recipes) {
        if (recipes) {
            recipes.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                    <p>Category: ${meal.strCategory}</p>
                    <p>Area: ${meal.strArea}</p>
                `;
                if (resultDiv) {
                    resultDiv.appendChild(recipeDiv);
                }
            });
        }
    }
    
}
document.addEventListener("DOMContentLoaded", init);