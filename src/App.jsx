import './App.css'
import { SectionGame } from './components/SectionGame';

function App() {

  return (
    <>
      <div className="bodyGame">
        <SectionGame collor="red" />
        <SectionGame collor="green" />
        <SectionGame collor="blue" />
      </div>
    </>
  )
}

export default App
