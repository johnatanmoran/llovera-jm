'use strict';

document.getElementById("checkWeather").addEventListener("click", () => 
	{
		const pastWeather = document.getElementById("pastWeather");
		const currentLocation = document.getElementById("currentLocation");
		const futureWeather = document.getElementById("futureWeather");

		pastWeather.textContent = "Obteniendo datos previos...";
		currentLocation.textContent = "Detectando ubicación...";
		futureWeather.textContent = "Consultando predicción futura...";

		// Busco la ubicación del usuario
		if (navigator.geolocation) 
			{
			navigator.geolocation.getCurrentPosition(
			async (position) => 
				{
				const { latitude, longitude } = position.coords;
				console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
				try
					{
						// Consultar API de Open Meteo
						const response = await fetch(
						`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability&timezone=auto`);
					const data = await response.json();
					console.log(data);

					// Obtener datos previos, actuales y futuros
					const past8Hours = data.hourly.precipitation_probability.slice(-8);
					const next8Hours = data.hourly.precipitation_probability.slice(0, 8);

					// Mostrar datos previos y futuros
					pastWeather.textContent = `Lluvias en las últimas 8 horas: ${past8Hours.join("%, ")}%`;
					futureWeather.textContent = `Lluvias en las próximas 8 horas: ${next8Hours.join("%, ")}%`;

					// Consultar nombre de la región
					const locationResponse = await fetch(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
					);
					const locationData = await locationResponse.json();
					const locationName = locationData.address.city || locationData.address.state || "Tu ubicación";

					// Mostrar el nombre de la ciudad/ubicación actual
					currentLocation.textContent = `Ubicación actual: ${locationName}`;
					} catch (error) {
					console.error(error);
					pastWeather.textContent = "Error al obtener datos previos.";
					currentLocation.textContent = "Error al detectar ubicación.";
					futureWeather.textContent = "Error al obtener datos futuros.";
					}
				},
				(error) => {
					console.error(error);
					pastWeather.textContent = "No pudimos acceder a los datos previos.";
					currentLocation.textContent = "No pudimos acceder a tu ubicación.";
					futureWeather.textContent = "No pudimos acceder a los datos futuros.";
				}
			);
			} else {
			pastWeather.textContent = "La geolocalización no está soportada en tu navegador.";
			currentLocation.textContent = "La geolocalización no está soportada en tu navegador.";
			futureWeather.textContent = "La geolocalización no está soportada en tu navegador.";
			}
	  });