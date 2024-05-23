
// // bacgroundImage=document.getElementsByClassName('background-image');


// document.addEventListener('DOMContentLoaded', () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         getWeather(latitude, longitude);
//       },
//       (error) => {
//         console.error('Error getting geolocation', error);
//         const lastSearchedCity = localStorage.getItem('lastSearchedCity');
//         if (lastSearchedCity) {
//           getWeather(null, null, lastSearchedCity);
//         }
//       }
//     );
//   } else {
//     console.error('Geolocation is not supported by this browser.');
//   }

// });



// async function getWeather(lat = null, lon = null, city = null) {
//   if (!city) {
//     city = document.getElementById('city').value;
//     localStorage.setItem('lastSearchedCity', city);
//   }

//   const apiKey = 'd560441e76454b1e88b164029242005';
//   let url;
//   if (lat && lon) {
//     url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
//   } else {
//     url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
//   }

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('City not found');
//     }
//     const data = await response.json();
//     displayWeather(data.location, data.current);

    
//   } catch (error) {
//     document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
//   }
// }



// function displayWeather(location, current) {
//   const weatherResult = document.getElementById('weather-result');
//   const condition = current.condition.text.toLowerCase();
//   const icon = current.condition.icon;

//   //checs i icon is day or night
//   const isDay = icon.includes("day");

//   const backgroundImages = {
//     sunny: {
//       day: 'sunny.jpg',
//       night: 'sunny.jpg'
//     },
//     clear: {
//       day: 'clear.jpg',
//       night: 'clearn.jpg'
//     },
//     rain: {
//       day: 'rainday.jpg',
//       night: 'rainy.jpg'
//     },
//     cloudy: {
//       day: 'cloudyd.jpg',
//       night: 'cloudy.jpg'
//     },
//     overcast: {
//       day: 'cloudyd.jpg',
//       night: 'cloudy.jpg'
//     }
//   };

// //dynamic images according to day and night
//   let backgroundImage = isDay ? 'sunny.jpg' : 'clearn.jpg'; //this is by default

//   for (const [key, value] of Object.entries(backgroundImages)) {
//     if (condition.includes(key)) {
//       backgroundImage = isDay ? value.day : value.night;
//       break;
//     }
//   }
//     document.body.style.backgroundImage = `url('images/${backgroundImage}')`;
    


//   weatherResult.innerHTML = `
//     <h2>${location.name}, ${location.country}</h2>
//     <p>Local Time: ${location.localtime}</p>
//     <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
//     <p>Condition: ${current.condition.text}</p>
//     <img src="https:${current.condition.icon}" alt="${current.condition.text}">
//     <p>Wind Speed: ${current.wind_kph} km/h (${current.wind_mph} mph) ${current.wind_dir}</p>
//     <p>Pressure: ${current.pressure_mb} mb (${current.pressure_in} inHg)</p>
//     <p>Humidity: ${current.humidity}%</p>
//     <p>Cloud Cover: ${current.cloud}%</p>
//     <p>Feels Like: ${current.feelslike_c}°C (${current.feelslike_f}°F)</p>
//     <p>Visibility: ${current.vis_km} km (${current.vis_miles} miles)</p>
//     <p>UV Index: ${current.uv}</p>
//     <p>Gust Speed: ${current.gust_kph} km/h (${current.gust_mph} mph)</p>
//   `;
// }
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
  const condition = current.condition.text.toLowerCase();
  const icon = current.condition.icon;
  const isDay = icon.includes("day");

  const backgroundImages = {
      sunny: {
          day: 'sunny.jpg',
          night: 'sunny.jpg'
      },
      clear: {
          day: 'clear.jpg',
          night: 'clearn.jpg'
      },
      rain: {
          day: 'rainday.jpg',
          night: 'rainy.jpg'
      },
      cloudy: {
          day: 'cloudyd.jpg',
          night: 'cloudy.jpg'
      },
      overcast: {
          day: 'cloudyd.jpg',
          night: 'cloudy.jpg'
      }
  };

  let backgroundImage = isDay ? 'sunny.jpg' : 'clearn.jpg';
  for (const [key, value] of Object.entries(backgroundImages)) {
      if (condition.includes(key)) {
          backgroundImage = isDay ? value.day : value.night;
          break;
      }
  }
  document.body.style.backgroundImage = `url('images/${backgroundImage}')`;

  weatherResult.innerHTML = `
      <h2>${location.name}, ${location.country}</h2>
      <div class="weather-detail-container">
          <div class="weather-detail"><i class="material-icons">access_time</i> Local Time: ${location.localtime}</div>
          <div class="weather-detail"><i class="material-icons">thermostat</i> Temperature: ${current.temp_c}°C (${current.temp_f}°F)</div>
          <div class="weather-detail"><i class="material-icons">wb_sunny</i> Condition: ${current.condition.text}</div>
          <div class="weather-detail"><img src="https:${current.condition.icon}" alt="${current.condition.text}"></div>
          <div class="weather-detail"><i class="material-icons">toys</i> Wind Speed: ${current.wind_kph} km/h (${current.wind_mph} mph) ${current.wind_dir}</div>
          <div class="weather-detail"><i class="material-icons">speed</i> Pressure: ${current.pressure_mb} mb (${current.pressure_in} inHg)</div>
          <div class="weather-detail"><i class="material-icons">opacity</i> Humidity: ${current.humidity}%</div>
          <div class="weather-detail"><i class="material-icons">cloud</i> Cloud Cover: ${current.cloud}%</div>
          <div class="weather-detail"><i class="material-icons">thermostat_auto</i> Feels Like: ${current.feelslike_c}°C (${current.feelslike_f}°F)</div>
          <div class="weather-detail"><i class="material-icons">visibility</i> Visibility: ${current.vis_km} km (${current.vis_miles} miles)</div>
          <div class="weather-detail"><i class="material-icons">flare</i> UV Index: ${current.uv}</div>
          <div class="weather-detail"><i class="material-icons">air</i> Gust Speed: ${current.gust_kph} km/h (${current.gust_mph} mph)</div>
      </div>
  `;
}
