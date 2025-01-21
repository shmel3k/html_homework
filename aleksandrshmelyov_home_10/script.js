function init() {

   // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK?unitGroup=metric&key=3YRH8JGDV3RUXAPTWDQVUE695
    
    const form = document.getElementById("locationForm");
    const locationName = document.getElementById('location');
    const resultDiv = document.querySelector('.result');

    // Search by name
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        resultDiv.innerHTML = "";

        if (!locationName || !resultDiv) {
            console.log("___Error", "Location or result not found");
            return;
        }

        const locationNameValue = locationName.value.trim();

        if (locationNameValue === "") {
            resultDiv.innerHTML = "Please enter location";
            return;
        }

        if (locationNameValue) {
            fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationNameValue}?unitGroup=metric&key=3YRH8JGDV3RUXAPTWDQVUE695`)
                .then(response => {
                    if (response.ok) {
                        return response.json().then(response => {
                            if (response) {
                           //     weatherResultForeach(response.days);
                           weatherResult(response);
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
    // Function to display weather results

  /*  function weatherResultForeach(data) {
             data.forEach(item => {
            resultDiv.innerHTML += `
            <div class = "resultDay">
            <h2>${item.datetime}</h2>
            <p>${item.temp}</p>
            <p>${item.description}</p>
            <p>${item.icon}</p>
                <div class = "resultHours">  
                <p>${item.hours.map(hour => hour.datetime + ' ' + hour.temp).join(', ')}</p>
                </div>
            </div>
            `
        })
    }
*/

    function weatherResult(data) {
        const { address, days } = data || {};
        if (!days) {
            displayError('Прогноз недоступен для выбранного города.');
            return;
        }
    
        resultDiv.innerHTML = `<h2>Прогноз для города: ${address}</h2>`;
    
        days.forEach(day => {
            const { datetime, tempmax, tempmin, hours } = day;
    
            let hourlyWeather = '<h3>Погода по часам:</h3>';
            hours.forEach(hour => {
                hourlyWeather += `
                    <p><strong>${hour.datetime}: </strong>${hour.temp}°C, ${hour.conditions}</p>
                `;
            });
    
            resultDiv.innerHTML += `
                <div class="day">
                    <h3>${datetime}</h3>
                    <p>Максимальная температура: ${tempmax}°C</p>
                    <p>Минимальная температура: ${tempmin}°C</p>
                    ${hourlyWeather}
                </div>
            `;
        });
    }
    
}

document.addEventListener("DOMContentLoaded", init);