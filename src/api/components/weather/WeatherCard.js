import React from 'react';

import '../../../App.css';
import './weatherCard.css';

const WeatherCard = ({ weather, removeCity, stock }) => {
	return (
		<>
			{weather.main && (
				<div className={stock ? 'city-stock' : 'city'}>
					<div className='city-title'>
						<h2 className='city-name'>
							<span>{weather.name}</span>
							<sup>{weather.sys.country}</sup>
						</h2>
						{!stock && (
							<button
								className='btn btn-danger'
								onClick={() => {
									removeCity(weather.id);
								}}
							>
								<i className='fa fa-trash' aria-hidden='true'></i>
							</button>
						)}
					</div>

					<div className='city-temp'>
						{Math.round(weather.main.temp)}
						<sup>&deg;C</sup>
					</div>
					<div className='info'>
						<img
							className='city-icon'
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							alt={weather.weather[0].description}
						/>
						<p>{weather.weather[0].description}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default WeatherCard;
