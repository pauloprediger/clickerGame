import { useReducer, useRef, useCallback, useMemo, useEffect, useState } from 'react';
import './App.css';
import './assets/styles/cat-animation.css';
import { SectionGame } from './components/SectionGame';
import { v4 as uuidv4 } from 'uuid';
import ButtonGame from './components/ButtonGame';

// Definição inicial dos botões do jogo
const initialButtonsState = [
	{ id: uuidv4(), name: 'Siamese', color: '#FFB3BA', numberOfCats: 0, priceOfCats: 15, meowsPerSecond: 0.1 },
	{ id: uuidv4(), name: 'Maine Coon', color: '#FFDFBA', numberOfCats: 0, priceOfCats: 100, meowsPerSecond: 1 },
	{ id: uuidv4(), name: 'Bengal', color: '#FFFFBA', numberOfCats: 0, priceOfCats: 1000, meowsPerSecond: 8 },
	{ id: uuidv4(), name: 'Persian', color: '#BAFFC9', numberOfCats: 0, priceOfCats: 10000, meowsPerSecond: 45 },
	{ id: uuidv4(), name: 'Sphynx', color: '#BAE1FF', numberOfCats: 0, priceOfCats: 100000, meowsPerSecond: 10000 },
	{ id: uuidv4(), name: 'Ragdoll', color: '#E6E6FA', numberOfCats: 0, priceOfCats: 1000000, meowsPerSecond: 100000 },
	{ id: uuidv4(), name: 'Scottish Fold', color: '#FADADD', numberOfCats: 0, priceOfCats: 10000000, meowsPerSecond: 1000000 },
	{ id: uuidv4(), name: 'Savannah', color: '#C5E1A5', numberOfCats: 0, priceOfCats: 100000000, meowsPerSecond: 10000000 },
	{ id: uuidv4(), name: 'Russian Blue', color: '#B3E5FC', numberOfCats: 0, priceOfCats: 1000000000, meowsPerSecond: 100000000 },
	{ id: uuidv4(), name: 'British Shorthair', color: '#D1C4E9', numberOfCats: 0, priceOfCats: 10000000000, meowsPerSecond: 1000000000 }
];

// Reducer para gerenciar o estado dos botões
const buttonsReducer = (state, action) => {
	switch (action.type) {
	case 'INCREMENT_CATS':
		return state.map(button => {
			if (button.id === action.id) {
				if (action.meowCount >= button.priceOfCats) {
					const newPrice = Math.ceil(button.priceOfCats * 1.15);
					return {
						...button,
						numberOfCats: button.numberOfCats + 1,
						priceOfCats: newPrice,
					};
				}
			}
			return button;
		});
	default:
		return state;
	}
};

function App() {
	const [buttonsGame, dispatch] = useReducer(buttonsReducer, initialButtonsState);
	const [meowCount, setMeowCount] = useState(0);
	const audioRef = useRef(null);

	// Função para calcular o total de Meows por segundo, baseado nos gatos comprados
	const calculateMeowsPerSecond = useCallback(() => {
		return buttonsGame.reduce((total, button) => {
			return total + button.numberOfCats * button.meowsPerSecond;
		}, 0);
	}, [buttonsGame]);

	// useEffect para incrementar os Meows automaticamente com base no tempo
	useEffect(() => {
		const meowsPerSecond = calculateMeowsPerSecond();
		if (meowsPerSecond > 0) {
			const interval = setInterval(() => {
				setMeowCount(prevCount => prevCount + meowsPerSecond);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [calculateMeowsPerSecond]);

	// Definição das cores de fundo das seções do jogo (memoizada com useMemo)
	const definitionsSectionGame = useMemo(() => [
		{ id: uuidv4(), name: 'clicker', color: '#FFBCBC' },
		{ id: uuidv4(), name: 'menuClicker', color: '#E3EA94' },
		{ id: uuidv4(), name: 'shopClicker', color: '#6882B3' }
	], []);

	// Função para incrementar o contador de Meows, memorizada com useCallback
	const onChangeMeow = useCallback(() => {
		setMeowCount(prevCount => prevCount + 1);
		if (audioRef.current) {
			audioRef.current.play();
		}
	
		// Lógica de animação para o clique
		const catImage = document.querySelector('.img-cat');
		if (catImage) {
			catImage.classList.add('pulsing');
			setTimeout(() => {
				catImage.classList.remove('pulsing');
			}, 800);
		}
	}, []);

	// Função para clarear a cor (ou torná-la menos escura)
	const lightenColor = useCallback((color, percent) => {
		let r = parseInt(color.slice(1, 3), 16);
		let g = parseInt(color.slice(3, 5), 16);
		let b = parseInt(color.slice(5, 7), 16);

		// Aumenta a intensidade de cada componente de cor, multiplicando por (1 + percent)
		r = Math.min(255, Math.round(r * (1 + percent))); // Garante que não ultrapasse 255
		g = Math.min(255, Math.round(g * (1 + percent)));
		b = Math.min(255, Math.round(b * (1 + percent)));

		// Retorna a cor mais clara no formato hexadecimal
		return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
	}, []);

	// Função para lidar com o clique no botão de compra de gatos
	const handleButtonClick = useCallback((id) => {
		const button = buttonsGame.find(button => button.id === id);
		if (button && meowCount >= button.priceOfCats) {
			setMeowCount(prevCount => prevCount - button.priceOfCats);
			dispatch({ type: 'INCREMENT_CATS', id, meowCount });
		}
	}, [buttonsGame, meowCount]);

	return (
		<div className='bodyGame'>
			{definitionsSectionGame.map(sectionGame => (
				<SectionGame
					key={sectionGame.id}
					name={sectionGame.name}
					color={sectionGame.color}
					lightenColor={lightenColor} // Passando a função lightenColor
				>
					{sectionGame.name === 'clicker' && (
						<div className='container-clicker'>
							<div className='cat-counters'>
								<h1>Meow's <br /> {`${parseInt(meowCount)}`}</h1>
								<p>Per sec {`${parseFloat(calculateMeowsPerSecond()).toFixed(2)}`}</p>
							</div>
							<img
								className='img-cat'
								src="/clickerGame/images/cat-images/cat.png"
								alt="Cat * - *"
								onClick={onChangeMeow}
							/>
							<audio ref={audioRef} src='/clickerGame/audio/kitten.mp3' />
						</div>
					)}
					{sectionGame.name === 'shopClicker' && (
						<div className='buttonContainer'>
							{buttonsGame.map(buttonGame => (
								<ButtonGame
									key={buttonGame.id}
									name={buttonGame.name}
									color={buttonGame.color}
									number={buttonGame.numberOfCats}
									price={buttonGame.priceOfCats}
									onClick={() => handleButtonClick(buttonGame.id)}
								/>
							))}
						</div>
					)}
				</SectionGame>
			))}
		</div>
	);
}

export default App;
