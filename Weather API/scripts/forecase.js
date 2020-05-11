// key : 	AkKC8i1XANDQGGsiPRRDUI8w6FrCyGDb
// resource URL: http://dataservice.accuweather.com/locations/v1/cities/search

const key = 'AkKC8i1XANDQGGsiPRRDUI8w6FrCyGDb';

// ******* 2 seperated function approach **********
//get weather information
const getWeather = async (id) =>{
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;
  const response = await axios.get(base + query);
  return response.data[0];
};

//get city information
const getCity = async (city) =>{
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;
  const response = await axios.get(base + query);
  return response.data[0];
};
// ******* end of 2 seperated function approach **********

// // All in one approach
// const getWeatherFromCity = async (city) => {
//   //get city information
//   const cityBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//   const cityQuery = `?apikey=${key}&q=${city}`;
//   const cityReponse = await axios.get(cityBase + cityQuery);
//   const cityResponseKey = cityReponse.data[0].Key;

//   //get the weather condition of that city
//   const weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/';
//   const weatherQuery = `${cityResponseKey}?apikey=${key}`;
//   const weatherResponse = await axios.get(weatherBase + weatherQuery);
//   return weatherResponse.data;
// }

