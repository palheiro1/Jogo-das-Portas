// App.js
import React, { useState } from 'react';
import './App.css'; // CSS atualizado com estilos coloridos e animações

const Door = ({ number, onClick, isSelected, isDisabled, isOpen, isDimmed, showButton, buttonText, onButtonClick }) => {
  const doorClass = `door ${isSelected ? 'door-selected' : ''} ${isDimmed ? 'door-dimmed' : ''}`;
  
  return (
    <div className="door-container">
      <div className={doorClass} onClick={onClick} style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}>
        {isOpen ? <div className="door-open">🎉 Tesouro 🎉</div> : <div className="door-closed">Porta {number}</div>}
      </div>
      {showButton && (
        <button className="choice-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

function App() {
  const [tesouroIndex, setTesouroIndex] = useState(Math.floor(Math.random() * 3));
  const [portaSelecionada, setPortaSelecionada] = useState(null);
  const [jogoAcabou, setJogoAcabou] = useState(false);
  const [portasReveladas, setPortasReveladas] = useState(false);
  const [portaAlternativa, setPortaAlternativa] = useState(null);
  const [podeTrocar, setPodeTrocar] = useState(false);
  const [contagemVitorias, setContagemVitorias] = useState(0);
  const [contagemDerrotas, setContagemDerrotas] = useState(0);
  const [escolhaFinal, setEscolhaFinal] = useState(null);

  // Função chamada quando o jogador clica em uma porta
  const handleDoorClick = (index) => {
    if (!jogoAcabou && portaSelecionada === null) {
      setPortaSelecionada(index);
      
      if (index === tesouroIndex) {
        const outrasPortas = [...Array(3).keys()].filter(i => i !== index);
        const portaAleatoria = outrasPortas[Math.floor(Math.random() * outrasPortas.length)];
        setPortaAlternativa(portaAleatoria);
      } else {
        setPortaAlternativa(tesouroIndex);
      }
      
      setPodeTrocar(true);
    }
  };

  // Função chamada quando o jogador decide se quer trocar ou manter a porta
  const handleDecision = (trocar) => {
    const escolha = trocar ? portaAlternativa : portaSelecionada;
    setEscolhaFinal(escolha); // Armazenamos a escolha final
    setJogoAcabou(true);

    if (escolha === tesouroIndex) {
      setContagemVitorias(contagemVitorias + 1);
    } else {
      setContagemDerrotas(contagemDerrotas + 1);
    }
    
    setPortasReveladas(true); // Revelamos todas as portas
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    setPortaSelecionada(null);
    setJogoAcabou(false);
    setPortasReveladas(false);
    setPortaAlternativa(null);
    setPodeTrocar(false);
    setTesouroIndex(Math.floor(Math.random() * 3));
    setEscolhaFinal(null);
  };

  return (
    <div className="app">
      <h1>Jogo das 3 Portas</h1>
      <div className="doors">
        {[...Array(3)].map((_, index) => (
          <Door
            key={index}
            number={index + 1}
            onClick={() => handleDoorClick(index)}
            isSelected={portaSelecionada === index}
            isOpen={portasReveladas && index === tesouroIndex}
            isDisabled={jogoAcabou || podeTrocar}
            isDimmed={podeTrocar && index !== portaSelecionada && index !== portaAlternativa}
            showButton={podeTrocar && (index === portaSelecionada || index === portaAlternativa)}
            buttonText={index === portaSelecionada ? "Manter escolha" : "Trocar de porta"}
            onButtonClick={() => handleDecision(index === portaAlternativa)}
          />
        ))}
      </div>

      {jogoAcabou && (
        <div className="result">
          {escolhaFinal === tesouroIndex ? 'Parabéns, você encontrou o tesouro!' : 'Que pena, não foi a porta correta.'}
        </div>
      )}

      {jogoAcabou && (
        <button className="reset-button" onClick={resetGame}>
          Jogar novamente
        </button>
      )}

      <div className="scoreboard">
        <p>Vitórias: {contagemVitorias}</p>
        <p>Derrotas: {contagemDerrotas}</p>
      </div>
    </div>
  );
}

export default App;
