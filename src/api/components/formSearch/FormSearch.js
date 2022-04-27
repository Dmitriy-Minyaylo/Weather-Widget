import React, { useState } from 'react';
import './formSearch.css';

const FormSearch = ({ addCity }) => {
	const [userInput, setUserInput] = useState('');

	const onKeyPress = e => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	const handleChance = e => {
		setUserInput(e.currentTarget.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		addCity(userInput);
		setUserInput('');
	};

	return (
		<form className='form' onSubmit={handleSubmit}>
			<input
				value={userInput}
				type='text'
				className='search'
				placeholder='Add city ...'
				onChange={handleChance}
				onKeyDown={onKeyPress}
			/>
			<button
				className='btn btn-success'
				onClick={e => {
					handleSubmit(e);
				}}
			>
				<i className='fa fa-paper-plane' aria-hidden='true'></i>
			</button>
		</form>
	);
};

export default FormSearch;
