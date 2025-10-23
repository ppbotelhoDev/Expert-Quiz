import { useState } from "react";

const Dashboard = ({ dbQuiz }) => {
  const [listaUsuarios] = useState(
    () => JSON.parse(localStorage.getItem("UserQuiz")) || []
  );
  const alunosAtivos = listaUsuarios.filter((user) => user.isTeacher === false);
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  const [materiaSelecionada, setMateriaSelecionada] = useState(
    userAtual.isTeacher === true ? userAtual.materias[0] : "Matemática"
  );

  const MATERIAS_TOTAIS = [
    "Matemática",
    "Português",
    "Física",
    "Química",
    "Biologia",
    "Geografia",
    "História",
    "Tecnologia",
    "Inglês",
    "Filosofia",
    "Sociologia",
  ];
  let MATERIAS_PROF = userAtual.materias;

  //Funções

  const handleMateriaChange = (event) => {
    setMateriaSelecionada(event.target.value); // Atualiza o estado com o valor selecionado
  };

  const mediaGeral = () => {
    //Filtra os alunos
    const filter = listaUsuarios.filter((u) => u.isTeacher === false);
    //Mapeia as notas
    const notas = filter.map((user) => user.notaMedia);
    //soma todas os valores
    const soma = notas.reduce((acc, vlr) => acc + vlr, 0);
    //Caucula a média das notas e retorna
    const tamanho = notas.length;
    return (soma / tamanho).toFixed(1);
  };

  //Ranking 3 melhores médias
  const top3Alunos = (users) => {
    const alunos = users.filter((user) => user.isTeacher === false);
    const alunosOrdenados = alunos.sort((alunoA, alunoB) => {
      // Garante que notaMedia existe e é um número, tratando null/undefined como 0
      const notaB = alunoB.notaMedia ?? 0;
      const notaA = alunoA.notaMedia ?? 0;
      return notaB - notaA;
    });
    const top3 = alunosOrdenados.slice(0, 3);
    return top3;
  };
  const top3Aluno = top3Alunos(listaUsuarios);

  //Top 3 menores médias
  const menores3Medias = (users) => {
    const alunos = users.filter((user) => user.isTeacher === false);
    const alunosOrdenados = alunos.sort((alunoA, alunoB) => {
      // Garante que notaMedia existe e é um número, tratando null/undefined como 0
      const notaB = alunoB.notaMedia ?? 0;
      const notaA = alunoA.notaMedia ?? 0;
      return notaA - notaB;
    });
    const top3 = alunosOrdenados.slice(0, 3);
    return top3;
  };
  const menorTop3 = menores3Medias(listaUsuarios);

  //Top 3 melhores médias de simulados
  const top3simulados = (dbSim) => {
    const simuladosOrdenados = dbSim.sort((sim1, sim2) => {
      // Garante que notaMedia existe e é um número, tratando null/undefined como 0
      const notaA = sim1.notaMedia ?? 0;
      const notaB = sim2.notaMedia ?? 0;
      return notaB - notaA;
    });
    const top3 = simuladosOrdenados.slice(0, 3);
    return top3;
  };
  const top3Sim = top3simulados(dbQuiz);

  function renderProf() {
    return MATERIAS_PROF.map((materia) => (
      <option key={materia} value={materia}>
        {materia}
      </option>
    ));
  }
  function renderGeral() {
    return MATERIAS_TOTAIS.map((materia) => (
      <option key={materia} value={materia}>
        {materia}
      </option>
    ));
  }

  //Identifica os quizes selecioandos ==============================================
  const quizzesDaMateria = dbQuiz.filter(
    (quiz) => quiz.materia === materiaSelecionada
  );
  let notaMediaDaMateria;
  if (quizzesDaMateria.length > 0) {
    // Soma as notas médias dos quizzes filtrados
    const somaNotas = quizzesDaMateria.reduce((acc, quiz) => {
      // Usa ?? 0 para tratar quizzes sem notaMedia
      return acc + (quiz.notaMedia ?? 0);
    }, 0);
    // Calcula a média e formata
    notaMediaDaMateria = (somaNotas / quizzesDaMateria.length).toFixed(1);
  }

  //QUIZ MAIOR NOTA (CORRIGIDO PARA PEGAR A MELHOR NOTA INDIVIDUAL) =================
  let melhorNota = 0; // Valor padrão

  if (quizzesDaMateria.length > 0) {
    // 1. Usa .flatMap() para juntar todos os arrays 'notas' de todos os quizzes dessa matéria.
    // Ex: [[{nota: 8}, {nota: 3}], [{nota: 7}]]  =>  [{nota: 8}, {nota: 3}, {nota: 7}]
    const todasAsNotasIndividuais = quizzesDaMateria.flatMap(
      (quiz) => quiz.notas || []
    );

    if (todasAsNotasIndividuais.length > 0) {
      // 2. Mapeia para pegar apenas os valores numéricos das notas.
      // Ex: [{nota: 8}, {nota: 3}, {nota: 7}]  =>  [8, 3, 7]
      const valoresDasNotas = todasAsNotasIndividuais.map((n) => n.nota); // 3. Usa Math.max() para encontrar o maior número no array. // Ex: Math.max(8, 3, 7)  =>  8

      melhorNota = Math.max(...valoresDasNotas);
    }
  } // Ajusta o formato do objeto para o JSX (o JSX espera 'quizMaiorMedia.nota')

  const quizMaiorMedia = {
    id: "N/A", // O ID não é mais relevante, pois é a nota máxima de todos os quizzes
    nota: melhorNota.toFixed(1), // Salva a nota máxima (ex: 8.0)
  };

  return (
    <div className="section-dashboard ">
      <div className="dash-left ">
        <div className="dashboard-cards">
          <div className="alunos-ativos cards-dsh ">
            <h4 className="title-card ">Alunos Ativos</h4>
            <h2 className="">{alunosAtivos.length}</h2>
          </div>
          <div className="simulados-totais cards-dsh ">
            <h4 className="title-card ">Simulados Totais</h4>
            <h2 className="">{dbQuiz.length}</h2>
          </div>
          <div className="nota-media-geral cards-dsh ">
            <h4 className="title-card ">Nota Média Geral</h4>
            <h2 className="">{mediaGeral() + "/10"}</h2>
          </div>
        </div>

        <div className="best5-simulados">
          <div>
            <h4>Simulados com maior média</h4>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img
                src={`${top3Sim[0] ? top3Sim[0].img : "simulado.png"}`}
                alt=""
                width={20}
              />
            </div>
            <div className="materia-ranking">
              {top3Sim[0] ? top3Sim[0].materia : "Default"}
            </div>
            <div className="id-simulado">
              #{top3Sim[0] ? top3Sim[0].id : "00000"}
            </div>
            <div className="nota-ranking">
              {top3Sim[0] ? top3Sim[0].notaMedia : "0"} / 10
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img
                src={`${top3Sim[1] ? top3Sim[1].img : "simulado.png"}`}
                alt=""
                width={20}
              />
            </div>
            <div className="materia-ranking">
              {top3Sim[1] ? top3Sim[1].materia : "Default"}
            </div>
            <div className="id-simulado">
              #{top3Sim[1] ? top3Sim[1].id : "00000"}
            </div>
            <div className="nota-ranking">
              {top3Sim[1] ? top3Sim[1].notaMedia : "0"} / 10
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img
                src={`${top3Sim[2] ? top3Sim[2].img : "simulado.png"}`}
                alt=""
                width={20}
              />
            </div>
            <div className="materia-ranking">
              {top3Sim[2] ? top3Sim[2].materia : "Default"}
            </div>
            <div className="id-simulado">
              #{top3Sim[2] ? top3Sim[2].id : "00000"}
            </div>
            <div className="nota-ranking">
              {top3Sim[2] ? top3Sim[2].notaMedia : "0"} / 10
            </div>
          </div>
        </div>
      </div>
      <div className="dash-center">
        <div className="infos-card-simulados ">
          <div>
            <h4>Informaçoes por matéria</h4>
          </div>
          <div className="info-select">
            <select
              name="materias-select" // Adicione um name
              id="materias"
              value={materiaSelecionada} // Conecta o valor ao estado
              onChange={handleMateriaChange}
            >
              {userAtual.isTeacher === true ? renderProf() : renderGeral()}
            </select>
          </div>
          <div className="card-info">
            <h5>Média Geral</h5>
            <h4>{notaMediaDaMateria} / 10</h4>
          </div>
          <div className="card-info">
            <h5>Melhor Média</h5>
            <h4>{quizMaiorMedia.nota} / 10</h4>
          </div>
        </div>
      </div>
      <div className="dash-right">
        <div className="best3-alunos ">
          <div className="title-top">
            <h4>Top 3 - Melhores Médias</h4>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="medal1.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              top3Aluno[0] ? top3Aluno[0].primeiroNome : "User"
            }  ${top3Aluno[0] ? top3Aluno[0].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${top3Aluno[0] ? top3Aluno[0].notaMedia : 0}` + " / 10"}
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="medal2.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              top3Aluno[1] ? top3Aluno[1].primeiroNome : "User"
            }  ${top3Aluno[1] ? top3Aluno[1].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${top3Aluno[1] ? top3Aluno[1].notaMedia : 0}` + " / 10"}
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="medal3.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              top3Aluno[2] ? top3Aluno[2].primeiroNome : "User"
            }  ${top3Aluno[2] ? top3Aluno[2].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${top3Aluno[2] ? top3Aluno[2].notaMedia : 0}` + " / 10"}
            </div>
          </div>
        </div>
        <div className="worst3-alunos ">
          <div className="title-top">
            <h4>Top 3 - Menores Médias</h4>
          </div>
          <div className=" box-ranking">
            <div className="icon-ranking">
              <img src="red1.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              menorTop3[2] ? menorTop3[2].primeiroNome : "User"
            }  ${menorTop3[2] ? menorTop3[2].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${menorTop3[2] ? menorTop3[2].notaMedia : 0}` + " / 10"}
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="red2.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              menorTop3[1] ? menorTop3[1].primeiroNome : "User"
            }  ${menorTop3[1] ? menorTop3[1].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${menorTop3[1] ? menorTop3[1].notaMedia : 0}` + " / 10"}
            </div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="red3.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{`${
              menorTop3[0] ? menorTop3[0].primeiroNome : "User"
            }  ${menorTop3[0] ? menorTop3[0].sobrenome : "Default"}`}</div>
            <div className="nota-aluno">
              {`${menorTop3[0] ? menorTop3[0].notaMedia : 0}` + " / 10"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  /*  */
};

export default Dashboard;
