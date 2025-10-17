import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Footer from "../components/Footer";
import Questions from "../components/Questions";
import Gabarito from "../components/Gabarito";
import OptionsProf from "../components/OptionsProf";
import { useForm } from "react-hook-form";

const CreateQuiz = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.user) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [location, navigate]);

  const userLogado = location.state?.user;

  if (!userLogado) {
    return null;
  }

  const dbUser = JSON.parse(localStorage.getItem("UserQuiz")) || [];

  const onSubmit = (data) => {
    const dbAntigo = JSON.parse(localStorage.getItem("DbCardQuiz")) || [];

    let idUnico;
    let idJaExiste = true;

    while (idJaExiste) {
      const idSorteado = Math.floor(1000 + Math.random() * 9000).toString();
      idJaExiste = dbAntigo.some((quiz) => quiz.id === idSorteado);

      if (!idJaExiste) {
        idUnico = idSorteado;
      }
    }

    const novoCardQuiz = {
      materia: data.materia,
      img: `${data.materia.toLowerCase()}.png`,
      id: idUnico,
      legenda: data.legenda,
      link: `/quiz/${idUnico}`,
    };

    const quizCompleto = {
      ...novoCardQuiz,
      professorId: data.professorId,
      perguntas: data.perguntas,
    };

    const dbAtualizado = [novoCardQuiz, ...dbAntigo];
    localStorage.setItem("DbCardQuiz", JSON.stringify(dbAtualizado));

    localStorage.setItem(`quiz_${idUnico}`, JSON.stringify(quizCompleto));

    alert("Simulado criado com sucesso!");
    navigate("/DashboardProfessor");
  };

  return (
    <>
      <div className="div-pai">
        <header className="header-Prof">
          <div className="containerHeader container">
            <div className="divLogo">
              <Link to={"/DashboardProfessor"}>
                <img className="logo" src={"logo.png"} alt="" />
              </Link>
            </div>
            <div className="navbar">
              <div className="linksNav">
                <Link
                  to={userLogado ? "/DashboardProfessor" : "/DashboardAluno"}
                  className="linkNav"
                >
                  Home
                </Link>
                <Link to={"/"} className="linkNav">
                  Notas
                </Link>
                <Link to={"/"} className="linkNav">
                  Cadastrar
                </Link>
                <Link to={"/"} className="linkNav">
                  Perfil
                </Link>
              </div>
              <div className="itensUser">
                <div className="newQuiz">
                  <button className="btnQuiz">Novo Simulado +</button>
                </div>
                <div className="perfilUser">
                  <p className="paragrafoUser">
                    Olá professor,
                    <br />
                    {userLogado.nome}
                  </p>
                </div>
                <div className="userExit">
                  <Link to={"/"}>
                    <button className="iconExit">
                      <LogOut />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content container">
          <form className="create-painel" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title-section">Novo Simulado</h1>
            <hr />
            <div className="select-class">
              <div className="option-class">
                <h1 className="title-questions">Matéria</h1>
                <select className="select-opt" {...register("materia")}>
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
              <div className="option-teacher">
                <h1 className="title-questions">Professor</h1>
                <select className="select-opt" {...register("professorId")}>
                  <OptionsProf db={dbUser} />
                </select>
              </div>
            </div>
            <hr />
            <div className="create-legend">
              <h1 className="title-questions">Legenda</h1>
              <input
                type="text"
                className="input-question-text"
                placeholder="Insira aqui as informações sobre o simulado."
                {...register("legenda", { required: true })}
              />
            </div>
            <hr />
            <div className="area-questions">
              {[...Array(10)].map((_, index) => (
                <Questions
                  key={index}
                  numeroQ={index + 1}
                  register={register}
                  index={index}
                />
              ))}
            </div>
            <div className="gabarito">
              <h1 className="title-questions">Gabarito</h1>
              <div className="gabarito-alt">
                {[...Array(10)].map((_, index) => (
                  <Gabarito
                    key={index}
                    alt={index + 1}
                    register={register}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <div className="enviarFormQuiz">
              <button type="submit" className="formQuiz">
                Criar
              </button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CreateQuiz;
