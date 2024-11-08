import React from 'react';
import './SectionGame.css';
import PropTypes from 'prop-types';

// Função para calcular uma cor mais escura
const darkenColor = (color, percent) => {
	let r = parseInt(color.slice(1, 3), 16);
	let g = parseInt(color.slice(3, 5), 16);
	let b = parseInt(color.slice(5, 7), 16);

	r = Math.round(r * (1 - percent));
	g = Math.round(g * (1 - percent));
	b = Math.round(b * (1 - percent));

	// Retorna a cor escurecida no formato hexadecimal
	return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
};

export const SectionGame = ({ name, color, children }) => {
	// Calcula a cor mais escura (20% mais escura neste caso)
	const darkColor = darkenColor(color, 0.1); // Ajuste o valor de 0.2 para o quanto você quiser escurecer a cor

	// Define o estilo para a seção, incluindo a cor zebrada
	const sectionStyle = {
		background: name === 'clicker'
			? `repeating-linear-gradient(45deg, ${color}, ${color} 10px, ${darkColor} 10px, ${darkColor} 20px)`
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
};