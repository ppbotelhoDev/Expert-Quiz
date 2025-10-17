const Questions = ({ numeroQ, register, index }) => {
  return (
    <div className="questions">
      <div className="input-questions">
        <h1 className="title-questions">Questão {numeroQ}:</h1>
        <input
          className="input-question-text"
          maxLength={700}
          type="text"
          placeholder="Max. 700 caracteres"
          
          {...register(`perguntas.${index}.texto`, { required: true })}
        />
      </div>
      <div className="box-answers">
        {/* <div className="input-answers">
          <h3 className="title-alt">Figura/Representação: </h3>
          <input
            type="file"
            className="file-answer"
            maxLength={300}
            placeholder="Max. 300 caracteres"
            {...register(`perguntas.${index}.image`, { required: false })}
          />
        </div> */}
        <div className="input-answers">
          <h3 className="title-alt">Alternativa A: </h3>
          <input
            type="text"
            className="alt-anwsers"
            maxLength={300}
            placeholder="Max. 300 caracteres"
            {...register(`perguntas.${index}.opcoes.0`, { required: true })}
          />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa B: </h3>
          <input
            type="text"
            className="alt-anwsers"
            maxLength={300}
            placeholder="Max. 300 caracteres"
            {...register(`perguntas.${index}.opcoes.1`, { required: true })}
          />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa C: </h3>
          <input
            type="text"
            className="alt-anwsers"
            maxLength={300}
            placeholder="Max. 300 caracteres"
            {...register(`perguntas.${index}.opcoes.2`, { required: true })}
          />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa D: </h3>
          <input
            type="text"
            className="alt-anwsers"
            maxLength={300}
            placeholder="Max. 300 caracteres"
            {...register(`perguntas.${index}.opcoes.3`, { required: true })}
          />
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default Questions;
