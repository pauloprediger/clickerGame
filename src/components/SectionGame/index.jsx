import React from 'react';
import './SectionGame.css';
import PropTypes from 'prop-types';

export const SectionGame = ({ name, color, children, lightenColor }) => {
	// Calcula a cor mais clara (20% mais clara neste caso)
	const lightColor = lightenColor(color, 0.2); // Ajuste o valor de 0.2 para o quanto você quiser clarear a cor

	// Define o estilo para a seção, incluindo a cor zebrada
	const sectionStyle = {
		background: (name === 'clicker' || name === 'menuClicker')
			? `repeating-linear-gradient(45deg, ${color}, ${color} 10px, ${lightColor} 10px, ${lightColor} 20px)`
			: color, // Para as outras seções, aplica apenas a cor de fundo
	};

	return (
		<section className="sectionGame" style={sectionStyle}>
			{children}
		</section>
	);
};

SectionGame.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	children: PropTypes.node,
	lightenColor: PropTypes.func.isRequired,
};