<header style="text-align: center; background-color: #111; color: #eee; padding: 2rem;">

![](https://cdn.prod.website-files.com/5f3108520188e7588ef687b1/620e82ff8680cd26532fff29_Logotipo%20HACK%20A%20BOSS_white%20100%20px.svg)

</header>

# ¿Lloverá? ☂️

Aplicación web que muestra si va a llover en las próximas 8 horas en la localización actual.

Proyecto para el bootcamp de programación de Hack A Boss 2024.

## Descripción
- La aplicación debe mostrar una página inicial con el título y único
botón.
- Al hacer clic en el botón la aplicación debe detectar la localización
actual del navegador.
- Después de saber las coordenadas GPS de localización debe
conectarse a una API meteorológica y recoger la predicción de las
próximas horas.
- De esa predicción debe analizarse si en alguna de las próximas
horas hay pronóstico de lluvia.
- Finalmente la aplicación debe indicar si efectivamente va a llover o
no.

## Recursos
- [MDN: Fetch API][1]
- [Using the Geolocation API][2]
- [Open Meteo API][3]
- [Nominatim][4]
- [WMO Weather interpretation codes][5]

## Datos Relevantes

### Tabla de cifrado [WW-4677][6] de Organización Meteorológica Mundial (WMO)

| **Código WMO** | **Descripción**              | **Icono sugerido**       | **Condición**        |
|-----------------|-----------------------------|--------------------------|----------------------|
| 0               | Cielo despejado             | ☀️ (Sol)                  | Despejado            |
| 1-3             | Poca nubosidad              | 🌤️ (Sol con nubes)       | Parcialmente nublado |
| 4-8             | Nubosidad creciente         | ⛅ (Sol detrás de nubes) | Mayormente nublado   |
| 9-10            | Nublado                     | ☁️ (Nubes)                | Nublado              |
| 50-57           | Llovizna o niebla ligera    | 🌫️ (Niebla o gotitas)    | Llovizna/Niebla      |
| 61-63           | Lluvia intermitente         | 🌦️ (Sol y lluvia)        | Lluvia ligera        |
| 65-67           | Lluvia fuerte               | 🌧️ (Nubes y lluvia)      | Lluvia intensa       |
| 80-82           | Chubascos                   | 🌩️ (Nubes y rayos)       | Chubascos            |
| 95              | Tormenta eléctrica          | ⛈️ (Tormenta eléctrica)  | Tormenta             |
| 96-99           | Tormenta con granizo        | 🌨️ (Granizo)             | Tormenta/Granizo     |


[1]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[2]:https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[3]:https://open-meteo.com/
[4]:https://nominatim.openstreetmap.org
[5]:https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
[6]:http://observacion-atmosfera.at.fcen.uba.ar/practicas/Documento%20OMM%20-%20Claves.pdf