import { useState } from 'react';
import './App.css';
import { SectionGame } from './components/SectionGame';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Definição das cores de fundo das seções do jogo
  const [definitionsSectionGame, setDefinitionsSectionGame] = useState([
    { id: uuidv4(), name: 'clicker', color: '#FFBCBC' },
    { id: uuidv4(), name: 'menuClicker', color: '#E3EA94' },
    { id: uuidv4(), name: 'shopClicker', color: '#6882B3' }
  ]);

  return (
    <>
      <div className="bodyGame">
        {definitionsSectionGame.map(sectionGame => (
          <SectionGame
            key={sectionGame.id} // Corrigido para usar sectionGame.id
            name={sectionGame.name}
            color={sectionGame.color}
          />
        ))}
      </div>
    </>
  );
}

export default App;