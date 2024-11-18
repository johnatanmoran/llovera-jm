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

| Código     | Descripción                                         |
| ---------- | --------------------------------------------------- |
| 00         | Cielo despejado.                                    |
| 01         | Principalmente despejado.                           |
| 02         | parcialmente nublado.                               |
| 03         | Cielo cubierto.                                     |
| 45, 48     | Niebla y depósito de niebla de escarcha.            |
| 51, 53, 55 | Llovizna: Intensidad ligera, moderada y densa.      |
| 56, 57     | Llovizna helada: Intensidad ligera y densa. 	       |
| 61, 63, 65 | Lluvia: Intensidad leve, moderada y fuerte.         |
| 66, 67     | Lluvia helada: Intensidad ligera y fuerte.          |
| 71, 73, 75 | Caída de nieve: Intensidad leve, moderada y fuerte. |
| 77         | Granos de nieve.                                    |
| 80, 81, 82 | Lluvias: leves, moderadas y violentas.              |
| 85, 86     | Chubascos de nieve leves e intensos.                |
| 095, *     | Tormenta: Leve o moderada.                          |
| 096, 99, * | Tormenta con granizo leve y fuerte.                 |

| Código     | Descripción                                         |
| ---------- | --------------------------------------------------- |
| 00 - 03    | Cielo despejado.                                    |
| 04 - 09    | Bruma, polvo, arena o humo.                         |
| 10 - 12    | Neblina o Niebla.                                   |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |



[1]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[2]:https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[3]:https://open-meteo.com/
[4]:https://nominatim.openstreetmap.org
[5]:https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
[6]:http://observacion-atmosfera.at.fcen.uba.ar/practicas/Documento%20OMM%20-%20Claves.pdf