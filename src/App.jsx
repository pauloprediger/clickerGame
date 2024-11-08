import { useState, useRef } from 'react';
import './App.css';
import './assets/styles/cat-animation.css';
import { SectionGame } from './components/SectionGame';
import { v4 as uuidv4 } from 'uuid';
import ButtonGame from './components/ButtonGame';

function App() {
  // Definição das cores de fundo das seções do jogo
  const [definitionsSectionGame, setDefinitionsSectionGame] = useState([
    { id: uuidv4(), name: 'clicker', color: '#FFBCBC' },
    { id: uuidv4(), name: 'menuClicker', color: '#E3EA94' },
    { id: uuidv4(), name: 'shopClicker', color: '#6882B3' }
  ]);

  // Definição dos botões do jogo
  const [buttonsGame, setButtonsGame] = useState([
    { id: uuidv4(), name: 'Siamese', color: '#FFB3BA' },      // Tom pastel rosa claro
    { id: uuidv4(), name: 'Maine Coon', color: '#FFDFBA' },   // Tom pastel laranja claro
    { id: uuidv4(), name: 'Bengal', color: '#FFFFBA' },       // Tom pastel amarelo claro
    { id: uuidv4(), name: 'Persian', color: '#BAFFC9' },      // Tom pastel verde claro
    { id: uuidv4(), name: 'Sphynx', color: '#BAE1FF' },       // Tom pastel azul claro
    { id: uuidv4(), name: 'Ragdoll', color: '#E6E6FA' },      // Tom pastel lilás claro
    { id: uuidv4(), name: 'Scottish Fold', color: '#FADADD' },// Tom pastel rosa pálido
    { id: uuidv4(), name: 'Savannah', color: '#C5E1A5' },     // Tom pastel verde suave
    { id: uuidv4(), name: 'Russian Blue', color: '#B3E5FC' }, // Tom pastel azul bebê
    { id: uuidv4(), name: 'British Shorthair', color: '#D1C4E9' } // Tom pastel lavanda claro
  ]);

  // Definição variáveis jogo
  const [meowCount, setMeowCount] = useState(0);

  // Referência para audio
  const audioRef = useRef(null);

  // Função para incrementar o contador de Meows
  const onChangeMeow = () => {
    setMeowCount(prevCount => prevCount + 1);

    const catImage = document.querySelector('.img-cat');
    if (catImage) {
      // Adiciona a animação de pulsar ao clicar
      catImage.classList.add('pulsing');

      setTimeout(() => {
        catImage.classList.remove('pulsing');
      }, 800);

      // Toca o áudio
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className='bodyGame'>
      {definitionsSectionGame.map(sectionGame => (
        <SectionGame
          key={sectionGame.id}
          name={sectionGame.name}
          color={sectionGame.color}
        >
          {sectionGame.name === 'clicker' && (
            <div className='container-clicker'>
              <h1>Meow's: {`${meowCount}`}</h1>
              <img 
                className='img-cat' 
                src="/clickerGame/images/cat-images/cat.png" 
                alt="Cat * - *"
                onClick={onChangeMeow} // Chama a função de pulsar ao clicar
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