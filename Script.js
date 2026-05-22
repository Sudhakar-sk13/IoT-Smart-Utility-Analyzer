async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "60c6d7a0ecb0252d82ca8b902e27514b";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = "City not found!";
            return;
        }

        const temp = data.main.temp;
        const weather = data.weather[0].description;
        const humidity = data.main.humidity;

        document.getElementById("weatherResult").innerHTML = `
            <p><b>City:</b> ${city}</p>
            <p><b>Temperature:</b> ${temp}°C</p>
            <p><b>Weather:</b> ${weather}</p>
            <p><b>Humidity:</b> ${humidity}%</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching data!";
    }
}