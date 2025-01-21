function init() {

    // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK?unitGroup=metric&key=3YRH8JGDV3RUXAPTWDQVUE695

    const form = document.getElementById("locationForm");
    const locationName = document.getElementById('location');
    const resultDiv = document.querySelector('.result');

    // Search by city
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
                                weatherResultForeach(response);
                            } else {
                                resultDiv.innerHTML = "No cities found";
                            }
                        })
                    } else {
                        if (response.status === 404) {
                            resultDiv.innerHTML = "City not found";
                        } else {
                            resultDiv.innerHTML = "An error occurred";
                        }
                        return;
                    }
                })
        }
    });

    // Function to display weather results
    function weatherResultForeach(data) {
        const {
            days
        } = data;
        days.forEach(day => {
            const {
                datetime,
                temp,
                tempmax,
                tempmin,
                hours,
                conditions
            } = day;

            let hourResult = '';
            hours.forEach(hour => {
                hourResult += `<p> ${hour.datetime}: ${hour.temp}°C </p>`
            });

            resultDiv.innerHTML += `
                <div class="resultDay">
                    <h2> ${datetime} </h2>
                    <p> Avarage temperature: ${temp}°C </p>
                    <p> Maximum temperature: ${tempmax}°C </p>
                    <p> Minimum temperature: ${tempmin}°C </p>
                    <p class="conditions"> Conditions: ${conditions} </p>
                    <h4 id="hourTitle"> Hourly forecast </h4>
                        <div class="resultHour">
                            ${hourResult}
                        </div>
                </div>
                `;

        });
    }
}

document.addEventListener("DOMContentLoaded", init);