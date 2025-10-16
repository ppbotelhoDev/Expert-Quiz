const Questions = ({ numeroQ }) => {
  return (
    <div className="questions">
      <div className="input-questions">
        <h1 className="title-questions">Questão {numeroQ}:</h1>
        <input className="input-question-text" maxLength={700} type="text" placeholder="Max. 700 caracteres" />
      </div>
      <div className="box-answers">
        <div className="input-answers">
          <h3 className="title-alt">Alternativa A: </h3>
          <input type="Text" className="alt-anwsers" maxLength={300} placeholder="Max. 300 caracteres" />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa B: </h3>
          <input type="Text" className="alt-anwsers" maxLength={300} placeholder="Max. 300 caracteres" />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa C: </h3>
          <input type="Text" className="alt-anwsers" maxLength={300} placeholder="Max. 300 caracteres" />
        </div>
        <div className="input-answers">
          <h3 className="title-alt">Alternativa D: </h3>
          <input type="Text" className="alt-anwsers" maxLength={300} placeholder="Max. 300 caracteres" />
        </div>
      </div>
      <br/>
      <hr />
    </div>
  );
};

export default Questions;
