import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '886e5027bacfb19f6469c5704c65f0d9';

export const fetchWeatherByCityName = async query => {
	try {
		const { data } = await axios.get(URL, {
			params: {
				q: query,
				units: 'metric',
				lang: 'ua',
				APPID: API_KEY,
			},
		});
		return data;
	} catch (error) {
		if (error.data) {
			console.log(error.data.data);
			console.log(error.data.status);
			console.log(error.data.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
	}
};

export const fetchWeatherByCoordinates = async (latitude, longitude) => {
	try {
		const { data } = await axios.get(URL, {
			params: {
				lat: latitude,
				lon: longitude,
				units: 'metric',
				lang: 'ua',
				APPID: API_KEY,
			},
		});
		return data;
	} catch (error) {
		if (error.data) {
			console.log(error.data.data);
			console.log(error.data.status);
			console.log(error.data.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
	}
};
