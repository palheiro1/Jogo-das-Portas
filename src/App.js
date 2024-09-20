import React, { useState, useEffect } from 'react';
import './App.css'; // CSS atualizado
import coche from './carro.jpeg'; // Importa a imagem do carro
import cabra from './cabra.png'; // Importa a imagem da cabra
import door from './door-image.png';

// Componente para representar uma porta
const Door = ({ number, onClick, isSelected, isDisabled, isOpen, isDimmed, image, isFading, isHidden, isFinal }) => {
  if (isHidden) {
    return null; // Não renderiza a porta se estiver oculta
  }

  const doorClass = `door ${isSelected ? 'door-selected' : ''} ${isDimmed ? 'door-dimmed' : ''} ${isFading ? 'door-fading' : ''}`;
  const containerClass = `door-container ${isFinal ? 'door-final' : ''}`;
  

  return (
    <div className={containerClass}>
      <div className={`door-frame ${isOpen ? 'door-revealed' : ''}`}>
        {isOpen ? (
          <div className="door-open">
            <img src={image} alt="Conteúdo da porta" className="treasure-image" />
          </div>
        ) : (
          <div className={doorClass} onClick={isDisabled ? null : onClick}>
            <img src={door} alt="Porta" className="door-image" />
            <div className="door-number">{number}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Função principal do aplicativo
function App() {
  const [tesouroIndex, setTesouroIndex] = useState(Math.floor(Math.random() * 3));
  const [portaSelecionada, setPortaSelecionada] = useState(null);
  const [jogoAcabou, setJogoAcabou] = useState(false);
  const [portasReveladas, setPortasReveladas] = useState(false);
  const [podeTrocar, setPodeTrocar] = useState(false);
  const [contagemVitorias, setContagemVitorias] = useState(0);
  const [contagemDerrotas, setContagemDerrotas] = useState(0);
  const [escolhaFinal, setEscolhaFinal] = useState(null);
  const [portaRevelada, setPortaRevelada] = useState(null);
  const [portaSelecionadaFinal, setPortaSelecionadaFinal] = useState(null);
  const [portaAlternativa, setPortaAlternativa] = useState(null);
  const [portaDescartada, setPortaDescartada] = useState(null);
  const [portaReveladaAberta, setPortaReveladaAberta] = useState(false);
  const [portaDesvanecendo, setPortaDesvanecendo] = useState(false);
  const [portaOculta, setPortaOculta] = useState(false);

  const totalJogos = contagemVitorias + contagemDerrotas;
  const porcentagemVitorias = totalJogos > 0 ? ((contagemVitorias / totalJogos) * 100).toFixed(2) : 0;
  const allDoors = [...Array(3).keys()];

  const handleDoorClick = (index) => {
    if (!jogoAcabou && portaSelecionada === null) {
      setPortaSelecionada(index);
      console.log(`Tesouro está na porta: ${tesouroIndex}`);
    
      const outrasPortas = [...Array(3).keys()].filter(i => i !== index);
  
      // Verifica se sempre há duas outras portas
      if (outrasPortas.length !== 2) {
        console.error("Erro: o número de outras portas não é 2.");
        return;
      }
  
      let portaAlternativa;
      
      if (index === tesouroIndex) {
        // O jogador escolheu o tesouro, selecionamos uma cabra aleatoriamente
        portaAlternativa = outrasPortas[Math.floor(Math.random() * outrasPortas.length)];
      } else {
        // O jogador escolheu uma cabra, portaAlternativa é o tesouro
        portaAlternativa = outrasPortas.find(i => i === tesouroIndex);
      }
  
      // Depuração: verifica portaAlternativa
      if (portaAlternativa === null || portaAlternativa === undefined) {
        console.error("Erro: portaAlternativa é null ou undefined.");
        return;
      }
    
      setPortaRevelada(outrasPortas.find(i => i !== portaAlternativa)); // Revelamos a porta que não é a alternativa
      setPortaAlternativa(portaAlternativa); // Guardamos a portaAlternativa
      setPodeTrocar(true); // Permitir trocar
    }
  };
  
  
  useEffect(() => {
    if (portaRevelada !== null) {
      setPortaDesvanecendo(true); // Inicia o desvanecimento
      
      const timer = setTimeout(() => {
        setPortaOculta(true); // Oculta o contêiner depois de 2 segundos
      }, 1500);
      
      return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
    }
  }, [portaRevelada]);

  const handleDecision = (trocar) => {
    if (portaSelecionada === null || portaAlternativa === null) {
      console.error('Erro: portaSelecionada ou portaAlternativa são nulos.');
      console.log(portaSelecionada);
      console.log(portaAlternativa);
      return;
    }
  
    const novaEscolha = trocar ? portaAlternativa : portaSelecionada;
    
    setPortaSelecionadaFinal(novaEscolha);
    setPortaSelecionada(novaEscolha);
    setPortaDescartada(trocar ? portaSelecionada : portaAlternativa);
    setJogoAcabou(true);
    setPortasReveladas(true);
    setEscolhaFinal(novaEscolha);
  
    // Depuração
    console.log(`Tesouro está na porta: ${tesouroIndex}`);
    console.log(`Escolha final: ${novaEscolha}`);
  
    setTimeout(() => {
      if (novaEscolha === tesouroIndex) {
        console.log("Vitória!");
        setContagemVitorias(prev => prev + 1);
      } else {
        console.log("Derrota!");
        setContagemDerrotas(prev => prev + 1);
      }
    }, 200); 
  };
  
  
  
  

  const resetGame = () => {
    setPortaSelecionada(null);
    setPortaSelecionadaFinal(null);
    setJogoAcabou(false);
    setPortasReveladas(false);
    setPortaAlternativa(null);
    setPodeTrocar(false);
    setEscolhaFinal(null);
    setPortaRevelada(null);
    setPortaDescartada(null);
    setPortaOculta(false);
    
    // Certifique-se de que o tesouro só seja atualizado ao reiniciar
    setTimeout(() => {
      setTesouroIndex(Math.floor(Math.random() * 3));
    }, 100);
  };
  

  return (
    <div className="app">
      <h1>Jogo das 3 Portas</h1>
      <h4>Detrás de uma destas portas há um esplêndido carro, e detrás das outras duas... um par de cabras.</h4>
      <h4>Escolha uma, e das restantes duas, vamos descartar uma que contenha uma cabra. Depois poderás mudar a tua aposta final, se quiseres.</h4>

      <div className="doors">
        {allDoors.map((_, index) => (
          <Door
            key={index}
            number={index + 1}
            onClick={() => handleDoorClick(index)}
            isSelected={index === portaSelecionada || index === escolhaFinal}
            isOpen={index === portaRevelada || jogoAcabou && (index === 0 || index === 1 || index === 2)}
            isFinal={index === escolhaFinal}  
            isDisabled={jogoAcabou || podeTrocar}
            isDimmed={podeTrocar && index !== portaSelecionadaFinal && index !== portaAlternativa && index !== portaDescartada}
            isFading={index === portaRevelada && portaDesvanecendo}
            isHidden={index === portaRevelada && portaOculta}
            image={index === tesouroIndex ? coche : cabra}
          />
        ))}
      </div>

      {!jogoAcabou && podeTrocar && (
        <div className="decision-container">
          <h3>Agora que só restam duas portas... queres mudar de ideia?</h3>
          <button className="choice-button" onClick={() => handleDecision(false)}>Manter escolha</button>
          <button className="choice-button" onClick={() => handleDecision(true)}>Trocar de porta</button>
        </div>
      )}

      {jogoAcabou && (
        <div className="result">
          {escolhaFinal === tesouroIndex ? 'Parabéns, ganhaste o carro!' : 'Conforma-te com uma cabra...'}

        </div>
      )}

      {jogoAcabou && (
        <button className="reset-button" onClick={resetGame}>Jogar novamente</button>
      )}

      <div className="scoreboard">
        <p>Vitórias: {contagemVitorias}</p>
        <p>Derrotas: {contagemDerrotas}</p>
        <p>Porcentagem de vitórias: {porcentagemVitorias}%</p>
      </div>
      <div className="footer">
        <p className="footer-text">
          Este jogo testa o <strong><a href="https://pt.wikipedia.org/wiki/Problema_de_Monty_Hall" target="_blank" rel="noopener noreferrer">problema de Monty Hall</a></strong>. Joga várias vezes usando a mesma estratégia para verificar se os resultados coincidem com a teoria de probabilidades.
        </p>
        <p className="footer-text">
          <strong>Resultados esperados:</strong><br />
          Se <strong>sempre manténs a porta</strong>, ganharás <strong>33%</strong> das vezes.<br />
          Se <strong>sempre trocas a porta</strong>, ganharás <strong>66%</strong> das vezes.
        </p>
      </div>
    </div>
  );
}

export default App;
