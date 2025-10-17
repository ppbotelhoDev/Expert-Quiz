// Arquivo: Gabarito.jsx

// 1. Receba 'register' e 'index' como props
const Gabarito = ({ alt, register, index }) => {
  return (
    <div className="gabarito-item"> {/* Use um container se precisar */}
      <label>Q{alt}: </label>
      
      {/* 2. Use o register com o nome dinâmico para a resposta correta */}
      <select {...register(`perguntas.${index}.respostaCorretaIndex`)}>
        <option value="0">A</option>
        <option value="1">B</option>
        <option value="2">C</option>
        <option value="3">D</option>
      </select>
    </div>
  );
};

export default Gabarito;