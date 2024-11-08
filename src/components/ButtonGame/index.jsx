import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGame.css';

const ButtonGame = ({name, color}) => {
	const buttonStyle = {
		backgroundColor: color,
	};
	return (
		<button style={buttonStyle} className='buttonGame'>
			{name}
		</button>
	);
};

ButtonGame.propTypes = {
	name: PropTypes.string.isRequired, 
	color: PropTypes.string.isRequired, 
};
  

export default ButtonGame;