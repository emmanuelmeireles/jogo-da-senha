import React, { useState } from 'react';
import './App.css';

const gerarCombinacaoSecreta = () => {

  const digitos = '0123456789';
  let segredo = '';
  for (let i = 0; i < 4; i++) {
    const indiceAleatorio = Math.floor(Math.random() * digitos.length);
    segredo += digitos[indiceAleatorio];
  }
  return segredo;
};

const calcularBoisEVacas = (palpite, segredo) => {
  let bois = 0;
  let vacas = 0;

  for (let i = 0; i < 4; i++) {
    if (palpite[i] === segredo[i]) {
      bois++;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (palpite[i] !== segredo[i] && segredo.includes(palpite[i])) {
      bois++;
    }
  }

  return { bois, vacas };
};

const App = () => {
  const [combinacaoSecreta] = useState(gerarCombinacaoSecreta());
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState([]);

  const lidarComMudancaInput = (e) => {
    setPalpite(e.target.value);
  };

  const lidarComEnvio = (e) => {
    e.preventDefault();

    if (palpite.length !== 4 || !/^\d{4}$/.test(palpite)) {
      alert('Insira uma combinação de 4 números.');
      return;
    }

    const resultado = calcularBoisEVacas(palpite, combinacaoSecreta);
    const novaTentativa = {
      palpite,
      bois: resultado.bois,
      vacas: resultado.vacas,
    };

    setTentativas([novaTentativa, ...tentativas]);
    setPalpite('');
  };

  const revelarCombinacao = () => {
    alert('A combinação secreta é: ' + combinacaoSecreta);
  };
 
  const recarregarPagina = () => {
    window.location.reload(); 
  }

  return (
    <div className="App">
      <h1>Bois e Vacas</h1>
      <div>
        <label htmlFor="inputPalpite">Começe a tentar:</label>
        <input
          type="text"
          id="inputPalpite"
          value={palpite}
          onChange={lidarComMudancaInput}
          maxLength="4"
        />
        <button onClick={lidarComEnvio}>Verificar</button>
      </div>
      <div>
        <h3>Tentativas Anteriores:</h3>
        <ul>
          {tentativas.map((tentativa, index) => (
            <li key={index}>
              {`Tentativa: ${tentativa.palpite} - Bois: ${tentativa.bois} - Vacas: ${tentativa.vacas}`}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={revelarCombinacao}>Revelar combinação secreta</button>
      <button onClick={recarregarPagina}>Recarregar Página</button>
    </div>
  );
};

export default App;
