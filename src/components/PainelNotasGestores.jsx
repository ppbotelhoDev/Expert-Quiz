const PainelNotaGestores = ({ dbAlunos }) => {
  dbAlunos.sort((alunoA, alunoB) => {
    return alunoB.notaMedia - alunoA.notaMedia;
  });
/*  */

  return dbAlunos.map((userAtual) => (
    <div className="nota-media" key={userAtual.id}>
      <div className="photo-user-notas">
        <h4>
          {userAtual.PrimeiroNome[0]}
          {userAtual.Sobrenome[0]}
        </h4>
      </div>
      <div className="name-user">
        <h4>{userAtual.nomeCompleto}</h4>
      </div>
      <div className="id-user">
        <h4>#{userAtual.id}</h4>
      </div>
      <div className="nota-user">
        <h4>{userAtual.notaMedia}</h4>
      </div>
      <div className="status-user">
        {userAtual.notaMedia > 9 ? (
          <h5 className="back-green">Excelente</h5>
        ) : userAtual.notaMedia >= 7 ? (
          <h5 className="back-blue">Ótimo</h5>
        ) : (
          <h5 className="back-orange">Atenção</h5>
        )}
      </div>
    </div>
  ));
};

export default PainelNotaGestores;
