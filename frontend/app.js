const API_KEY = '6b131a175c4b9e2c30f14ba905188739';

let tempChart, humidityChart, windChart, pressureChart;

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);

      weatherInfo.innerHTML = `
        <h2 class="text-xl">${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Presion: ${data.main.pressure} hPa</p>
        <p>Velocidad Del Viento: ${data.wind.speed} m/s</p>
      `;

      showCharts(data);
      Toastify({
        text: "Weather data loaded!",
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "green"
      }).showToast();
    })
    .catch(err => {
      weatherInfo.textContent = 'Error: ' + err.message;
      Toastify({
        text: "Failed to fetch weather",
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "red"
      }).showToast();
    });
});

function showCharts(data) {
  const tempCtx = document.getElementById('tempChart').getContext('2d');
  const humidityCtx = document.getElementById('humidityChart').getContext('2d');
  const windCtx = document.getElementById('windChart').getContext('2d');
  const pressureCtx = document.getElementById('pressureChart').getContext('2d');

  if (tempChart) tempChart.destroy();
  if (humidityChart) humidityChart.destroy();
  if (windChart) windChart.destroy();
  if (pressureChart) pressureChart.destroy();

  tempChart = new Chart(tempCtx, {
    type: 'bar',
    data: {
      labels: ['Temperature'],
      datasets: [{
        label: '°C',
        data: [data.main.temp],
        backgroundColor: 'rgba(255,99,132,0.5)'
      }]
    }
  });

  humidityChart = new Chart(humidityCtx, {
    type: 'doughnut',
    data: {
      labels: ['Humidity', 'Remaining'],
      datasets: [{
        data: [data.main.humidity, 100 - data.main.humidity],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', '#eee']
      }]
    }
  });

  windChart = new Chart(windCtx, {
    type: 'line',
    data: {
      labels: ['Wind'],
      datasets: [{
        label: 'm/s',
        data: [data.wind.speed],
        borderColor: 'rgba(75, 192, 192, 0.5)',
        fill: false
      }]
    }
  });

  pressureChart = new Chart(pressureCtx, {
    type: 'pie',
    data: {
      labels: ['Pressure', 'Rest'],
      datasets: [{
        data: [data.main.pressure, 1000 - data.main.pressure],
        backgroundColor: ['rgba(153, 102, 255, 0.5)', '#ccc']
      }]
    }
  });
}