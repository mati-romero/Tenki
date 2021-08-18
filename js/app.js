var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var ico = document.querySelector(".icono");
var wind = document.querySelector(".wind");
var sunrise = document.querySelector(".sunrise");
var sunset = document.querySelector(".sunset");
var humidity = document.querySelector(".humidity");
var tempMax = document.querySelector(".tempMax");
var tempMin = document.querySelector(".tempMin");
var imagen = document.querySelector(".imagen");
var clouds = document.querySelector(".clouds");

function utcToHours(utcValue) {
  var myDate = new Date( utcValue *1000);
  var minutes = myDate.getMinutes();
  var hours = myDate.getHours();

  if (minutes < 10) {
    return ( hours + ':' + '0' + minutes + 'hs'); 
  }
  else {
    return ( hours + ':' + minutes + 'hs');    
  }
}

function imageGenerator(temp, wind, clouds, humidity) {

  //Celsius
  var temp = Math.round(parseInt(temp)  - 273.15);

  //Tornado
  if (wind>25) {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/tornando.png'>";
      imagen.innerHTML = "<img class='img-fluid' src='img/vientoo.gif'>";
      console.log("Tornado");
  }
  //lluvia o nieve
  else if (humidity > 90) {
    if (temp <= 0) {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/aguanieve.png'>";
      imagen.innerHTML = "<img class='img-fluid' src='img/inverno.gif'>";
      console.log("Nieve");
    }
    else {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/lluvia.png'>";
      imagen.innerHTML = "<img class='img-fluid' src='img/lluviaa.gif'>";
      console.log("Lluvia");
    }
  }
  //Nublado o no
  else {
    if (clouds > 50) {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/nubladoconsol.png'>";
      if (temp > 27) {
        imagen.innerHTML = "<img class='img-fluid' src='img/soladoo.gif'>";
        console.log("Parcialmente nublado y caluroso");
      } 
      else {
        imagen.innerHTML = "<img class='img-fluid' src='img/inverno.gif'>";
        console.log("Parcialmente nublado y frio");
      }
    }
    else if (clouds >= 100) {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/nublado.png'>";
      imagen.innerHTML = "<img class='img-fluid' src='img/nubladoo.gif'>";
      console.log("Nublado");
    }
    else {
      ico.innerHTML = "<img class='img-fluid' src='img/iconos/sol.png'>";

      if (temp > 27) {
        imagen.innerHTML = "<img class='img-fluid' src='img/soladooo.gif'>";
        console.log("Despejado y caluroso");
      } else {
        imagen.innerHTML = "<img class='img-fluid' src='img/inverno.gif'>";
        console.log("Despejado y frio");
      }
    }
  }
}

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var countryValue = data['sys']['country'];
  var descValue = data['weather'][0]['description'];
  var windValue = data['wind']['speed'];
  var sunriseValue = data['sys']['sunrise'];
  var sunsetValue = data['sys']['sunset'];
  var humidityValue = data['main']['humidity'];
  var tempMaxValue = data['main']['temp_max'];
  var tempMinValue = data['main']['temp_min'];
  var cloudsValue = data['clouds']['all'];

  console.log(data);

  main.innerHTML = nameValue + " - " + countryValue;
  desc.innerHTML = descValue;
  temp.innerHTML = Math.round(parseInt(tempValue)  - 273.15) + "°C";
  wind.innerHTML = "<p class='wind'><i class='fas fa-wind'></i>  " + windValue + "m/s</p>";
  sunrise.innerHTML = "<p><i class='fas fa-sun'></i>  "  + utcToHours(sunriseValue) + "</p>";
  sunset.innerHTML =  "<p><i class='fas fa-moon'></i>  " + utcToHours(sunsetValue) + "</p>";
  humidity.innerHTML = "<p><strong>Humidity:</strong>  " + humidityValue + "%</p>";
  tempMax.innerHTML = "<p><strong>max</strong>  " +Math.round(parseInt(tempMaxValue)  - 273.15) + "°</p>";
  tempMin.innerHTML = "<p><strong>min</strong>  " +Math.round(parseInt(tempMinValue)  - 273.15) + "°</p>";
  clouds.innerHTML = "<p><i class='fas fa-cloud'></i>"+ cloudsValue +"%<p>";
  imageGenerator(tempValue, windValue, cloudsValue, humidityValue);
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})