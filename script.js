

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      },
      (error) => {
        console.error('Error getting geolocation', error);
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        if (lastSearchedCity) {
          getWeather(null, null, lastSearchedCity);
        }
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }


  // VANTA.FOG({
  //   el: "#vanta-bg",
  //   mouseControls: true,
  //   touchControls: true,
  //   minHeight: 200.00,
  //   minWidth: 200.00,
  //   highlightColor: 0xff00ff,
  //   midtoneColor: 0x00ff00,
  //   lowlightColor: 0x0000ff,
  //   baseColor: 0x000000,
  //   blurFactor: 0.45,
  //   speed: 2.00
  // });

  VANTA.CLOUDS({
    el: "#your-element-selector",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00
  })

});




async function getWeather(lat = null, lon = null, city = null) {
  if (!city) {
    city = document.getElementById('city').value;
    localStorage.setItem('lastSearchedCity', city);
  }

  const apiKey = 'd560441e76454b1e88b164029242005';
  let url;
  if (lat && lon) {
    url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
  } else {
    url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data.location, data.current);

    
  } catch (error) {
    document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(location, current) {
  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = `
    <h2>${location.name}, ${location.country}</h2>
    <p>Local Time: ${location.localtime}</p>
    <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
    <p>Condition: ${current.condition.text}</p>
    <img src="https:${current.condition.icon}" alt="${current.condition.text}">
    <p>Wind Speed: ${current.wind_kph} km/h (${current.wind_mph} mph) ${current.wind_dir}</p>
    <p>Pressure: ${current.pressure_mb} mb (${current.pressure_in} inHg)</p>
    <p>Humidity: ${current.humidity}%</p>
    <p>Cloud Cover: ${current.cloud}%</p>
    <p>Feels Like: ${current.feelslike_c}°C (${current.feelslike_f}°F)</p>
    <p>Visibility: ${current.vis_km} km (${current.vis_miles} miles)</p>
    <p>UV Index: ${current.uv}</p>
    <p>Gust Speed: ${current.gust_kph} km/h (${current.gust_mph} mph)</p>
  `;
}
