import React, { useState, useEffect } from 'react';
import WeatherCard from './api/components/weather/WeatherCard';
import FormSearch from './api/components/formSearch/FormSearch';
import Pagination from './api/components/pagination/Pagination';
import Spinner from './api/components/spinner/Spinner';
import ErrorBoundary from './api/components/errorBoundary/ErrorBoundary';
import {
	fetchWeatherByCityName,
	fetchWeatherByCoordinates,
} from './api/fetchWeather';

import './App.css';

const App = () => {
	const [citiesWeather, setCitiesWeather] = useState([]);
	const [stockCity, setStockCity] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsPerPage] = useState(4);

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = citiesWeather.slice(indexOfFirstCard, indexOfLastCard);

	const paginate = pageNumber => setCurrentPage(pageNumber);

	const searchStockCityWeather = async (latitude, longitude) => {
		const data = await fetchWeatherByCoordinates(latitude, longitude);
		localStorage.setItem('stockCity', JSON.stringify(data));
		setStockCity(JSON.parse(localStorage.getItem('stockCity')));
	};

	useEffect(() => {
		setLoading(true);
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log('Latitude is :', position.coords.latitude);
			console.log('Longitude is :', position.coords.longitude);

			if (!JSON.parse(localStorage.getItem('stockCity'))) {
				searchStockCityWeather(
					position.coords.latitude,
					position.coords.longitude
				);
			} else {
				setStockCity(JSON.parse(localStorage.getItem('stockCity')));
			}

			if (JSON.parse(localStorage.getItem('citiesWeather'))) {
				setCitiesWeather(JSON.parse(localStorage.getItem('citiesWeather')));
			}

			setLoading(false);
		});
	}, []);

	const addCity = async city => {
		setLoading(true);
		if (city) {
			const data = await fetchWeatherByCityName(city);
			setLoading(false);
			if (!citiesWeather.some(item => item.id === data.id)) {
				localStorage.setItem(
					'citiesWeather',
					JSON.stringify([...citiesWeather, data])
				);

				setCitiesWeather(JSON.parse(localStorage.getItem('citiesWeather')));
			} else {
				console.log('Такой город уже есть в списке');
			}
		}
	};

	const removeCity = id => {
		const FilteredCitiesList = JSON.parse(
			localStorage.getItem('citiesWeather')
		).filter(city => city.id !== id);

		localStorage.setItem(
			'citiesWeather',
			JSON.stringify([...FilteredCitiesList])
		);

		setCitiesWeather(JSON.parse(localStorage.getItem('citiesWeather')));
	};

	return (
		<div className='main-container'>
			<FormSearch addCity={addCity} />
			{loading && <Spinner />}
			<br />
			<div className='stock-town'>
				<ErrorBoundary>
					<WeatherCard weather={stockCity} key={`stock`} stock />
				</ErrorBoundary>
				<ErrorBoundary>
					<div className='towns'>
						{currentCards.map((city, index) => (
							<WeatherCard
								weather={city}
								index={index}
								key={index}
								removeCity={removeCity}
							/>
						))}
					</div>
				</ErrorBoundary>
				<ErrorBoundary>
					<Pagination
						cardsPerPage={cardsPerPage}
						totalCards={citiesWeather.length}
						paginate={paginate}
					/>
				</ErrorBoundary>
			</div>
		</div>
	);
};

export default App;
