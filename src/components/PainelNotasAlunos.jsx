const PainelNotaAlunos = ({ userAtual }) => {
  return (
    <div className="box-aluno" key={userAtual.id}>
      <div className="nota-media">
        <div className="photo-user-notas">
          <h4>
            {userAtual.primeiroNome[0]}
            {userAtual.sobrenome[0]}
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
          ) : userAtual.notaMedia > 7 ? (
            <h5 className="back-blue">Ótimo</h5>
          ) : (
            <h5 className="back-orange">Atenção</h5>
          )}
        </div>
      </div>
      {/* <div className="all-notas">userAtual.</div> */}
    </div>
  );
};

export default PainelNotaAlunos;
