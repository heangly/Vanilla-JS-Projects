const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const detail = document.querySelector('.detail');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) =>{
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  //destructure property
  const {cityDets, weather} = data;

  //update details template
  detail.innerHTML = `  
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&#8457;</span>
  </div>
  `;

  //update the night/day & icon images
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime){
    timeSrc = 'img/day.svg';
  }else{
    timeSrc = 'img/night.svg';
  }

  time.setAttribute('src', timeSrc);

  //remove the d-none class if present
  card.classList.remove('d-none');
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather =  await getWeather(cityDets.Key);
  //short hand:
  return{cityDets, weather};

  //normal way
  // return{
  //   cityDets: cityDets,
  //   weather: weather
  // };
};

cityForm.addEventListener('submit', e =>{
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim().toLowerCase();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});