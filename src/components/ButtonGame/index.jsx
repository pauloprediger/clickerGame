import React from 'react';
import PropTypes, { number } from 'prop-types';
import './ButtonGame.css';
import { PiCatThin } from 'react-icons/pi';

const ButtonGame = ({name, color, number, price, onClick, className}) => {
	const buttonStyle = {
		backgroundColor: color,
	};
	return (
		<button style={buttonStyle} className= {`buttonGame ${className}`}  onClick={onClick}>
			<div>
				<h2 className='cat-name'>{name}</h2>
				<p><PiCatThin className='cat-icon' size={30}/>: {price}</p>
			</div>
			<div>
				<h1>{number}</h1>
			</div>
		</button>
	);
};

ButtonGame.propTypes = {
	name: PropTypes.string.isRequired, 
	color: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};
  

export default ButtonGame;