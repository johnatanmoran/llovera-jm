"use strict";

// Llamoa al evento botón
document.getElementById("checkWeather").addEventListener("click", () => {
    
    // Links a los elementos en el DOM
    const pastWeather = document.getElementById("pastWeather");                     // Probavilidad de lluvia de 8 horas antes
    const futureWeather = document.getElementById("futureWeather");                 // Probavilidad de lluvia 8 horas adelante
    const currentLocation = document.getElementById("currentLocation");             // Ciudad o Localidad
    const currentIcon = document.getElementById("weatherIcon");                     // Icono de tiempo actual
    const currentTemp = document.getElementById("currentTemp");                     // Temperatura actual
    const currentTempSensation = document.getElementById("currentTempSensation");   // Sensación termica actual

    // Agrego texto mientras espero las respuestas de las API's
    pastWeather.textContent = "Obteniendo datos previos...";
    currentLocation.textContent = "Detectando ubicación...";
    futureWeather.textContent = "Consultando predicción futura...";

    // Busco la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
                try {
                        // Consultar API de Open Meteo
                        const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,rain,weather_code&hourly=precipitation_probability,rain,weather_code&past_days=1&past_hours=8&forecast_days=1&forecast_hours=8&models=best_match&timezone=auto`
                    );
                    const data = await response.json();
                    console.log(data);  // Para ver la estructura que devuelve el API de Open Meteo (Borrar)
                    
                    // Guardo la hora actual para tener la referencia para el + o - del tiempo
                    const currentHour = new Date().getHours();

                    // 8 horas futuras (omitiendo la hora actual)
                    const next8Hours = data.hourly.precipitation_probability
                        .slice(-7, -1)
                    const next8Times = data.hourly.time.slice(-7, -1)
                    const futureData = next8Times.map((time, index) => {
                        const date = new Date(time);
                        const hour = date.getHours();
                        return {
                            hour: hour.toString().padStart(2, "0"),
                            probability: next8Hours[index],
                            hoursFromNow: ((hour - currentHour)+24)%24// Maneja las diferencias horarias cruzando medianoche
                        };
                    });
                    console.log(JSON.stringify(futureData, null, 2));

                    // 8 horas pasadas (omitiendo la hora actual y arreglando en orden inverso)
                    const past8Hours =
                        data.hourly.precipitation_probability.slice(0, 8).reverse();
                    const past8Times = data.hourly.time.slice(0, 8).reverse();
                    const pastData = past8Times.map((time, index) => {
                        const date = new Date(time);
                        const hour = date.getHours();
                        return {
                            hour: hour.toString().padStart(2, "0"),
                            probability: past8Hours[index],
                            hoursAgo: ((currentHour - hour)+24)%24 // Maneja las diferencias horarias cruzando medianoche
                        };
                    });
                    console.log(JSON.stringify(pastData, null, 2));

                    // Renderizar datos previos
                    pastWeather.innerHTML = pastData
                        .map(
                            (item) =>
                                `<div><p>${item.hour} Hrs. (-${item.hoursAgo}h)</p><p>Probabilidad de lluvia: ${item.probability}%</p></div>`
                        )
                        .join("");

                    // Renderizar datos futuros
                    futureWeather.innerHTML = futureData
                        .map(
                            (item) =>
                                `<div><p>${item.hour}Hrs (+${item.hoursFromNow}h)</p><p>Probabilidad de lluvia: ${item.probability}%</p></div>`
                        )
                        .join("");


                    // Códigos WMO
                    const weatherIcons = {
                        0: "☀️", // Cielo despejado
                        1: "🌤️", // Poca nubosidad
                        2: "🌤️", // Poca nubosidad
                        3: "⛅", // Poca nubosidad
                        4: "⛅", // Poca nubosidad
                        5: "☁️", // Nublado
                        40: "☁️", // Niebla
                        50: "🌫️", // Llovizna ligera
                        63: "🌦️", // Lluvia
                        65: "🌧️", // Lluvia intensa
                        80: "🌩️", // Chubascos
                        95: "⛈️", // Tormenta
                        96: "🌨️", // Granizo
                        99: "🌨️", // Granizo
                    };
                    const code = data.current.weather_code;
                    console.log("Código Weather " + code);
                    
                    currentIcon.textContent = weatherIcons[code] || `❓(${code})`; // Icono por defecto si no se encuentra con codigo
                    currentTemp.textContent =
                        "Temperatura: " + data.current.temperature_2m + "°C";
                    currentTempSensation.textContent =
                        "Sensación Termica: " +
                        data.current.apparent_temperature +
                        "°C";

                    // Consultar nombre de la región
                    const locationResponse = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const locationData = await locationResponse.json();
                    const locationName =
                        locationData.address.city ||
                        locationData.address.state ||
                        "Tu ubicación";

                    // Mostrar el nombre de la ciudad/ubicación actual
                    currentLocation.innerHTML =`
                        <h3>Ubicación actual</h3>
                        <p class="city">${locationName}</p>`;
                } catch (error) {
                    console.error(error);
                    pastWeather.textContent = "Error al obtener datos previos.";
                    currentLocation.textContent =""
                        "Error al detectar ubicación.";
                    futureWeather.textContent =
                        "Error al obtener datos futuros.";
                }
            },
            (error) => {
                console.error(error);
                pastWeather.textContent =
                    "No pudimos acceder a los datos previos.";
                currentLocation.textContent =
                    "No pudimos acceder a tu ubicación.";
                futureWeather.textContent =
                    "No pudimos acceder a los datos futuros.";
            }
        );
    } else {
        pastWeather.textContent =
            "La geolocalización no está soportada en tu navegador.";
        currentLocation.textContent =
            "La geolocalización no está soportada en tu navegador.";
        futureWeather.textContent =
            "La geolocalización no está soportada en tu navegador.";
    }
});
