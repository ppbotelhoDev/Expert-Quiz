const Dashboard = ({ dbQuiz }) => {
  const dbUser = JSON.parse(localStorage.getItem("UserQuiz"));
  const alunosAtivos = dbUser.filter((user) => user.isTeacher === false);
  //const notaMédia = dbQuiz.
  const nomeAluno = "Pedro Botelho";
  const notaAluno = 9.5;

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
            <h2 className="">{8.9 + "/10"}</h2>
          </div>
        </div>

        <div className="best5-simulados">
          <div>
            <h4>Simulados com maior média</h4>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src={"matemática.png"} alt="" width={20} />
            </div>
            <div className="materia-ranking">{"Matemática"}</div>
            <div className="id-simulado">#{2312}</div>
            <div className="nota-ranking">{8.9} / 10</div>
          </div>

          <div className="box-ranking">
            <div className="icon-ranking">
              <img src={"português.png"} alt="" width={20} />
            </div>
            <div className="materia-ranking">{"Português"}</div>
            <div className="id-simulado">#{9754}</div>
            <div className="nota-ranking">{8.5} / 10</div>
          </div>

          <div className="box-ranking">
            <div className="icon-ranking">
              <img src={"inglês.png"} alt="" width={20} />
            </div>
            <div className="materia-ranking">{"Inglês"}</div>
            <div className="id-simulado">#{4345}</div>
            <div className="nota-ranking">{8.3} / 10</div>
          </div>
        </div>
      </div>
      <div className="dash-center">
        <div className="infos-card-simulados ">
          <div>
            <h4>Informaçoes por matéria</h4>
          </div>
          <div className="info-select">
            <select name="" id="materias">
              <option value="Matemática">Matemática</option>
              <option value="Português">Português</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biologia">Biologia</option>
              <option value="Geografia">Geografia</option>
              <option value="História">História</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Inglês">Inglês</option>
              <option value="Filosofia">Filosofia</option>
              <option value="Sociologia">Sociologia</option>
            </select>
          </div>
          <div className="card-info">
            <h5>Nota Média</h5>
            <h4>{8.9 + "/10"}</h4>
          </div>
          <div className="card-info">
            <h5>Professor</h5>
            <h4>{"Pedro Paulo"}</h4>
          </div>
          <div className="card-info display">
            <h5>Maior média</h5>
            <div className="display">
              <div>
                <h4>{nomeAluno}</h4>
              </div>
              <div className="gray">|</div>
              <div>
                <h4>{notaAluno} / 10</h4>
              </div>
            </div>
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
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{9.8 + " / 10"}</div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="medal2.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{9.5 + " / 10"}</div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="medal3.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{9.4 + " / 10"}</div>
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
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{6.9 + " / 10"}</div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="red2.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{6.5 + " / 10"}</div>
          </div>
          <div className="box-ranking">
            <div className="icon-ranking">
              <img src="red3.png" alt="" width={20} />
            </div>
            <div className="nome-aluno">{nomeAluno}</div>
            <div className="nota-aluno">{6.3 + " / 10"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
