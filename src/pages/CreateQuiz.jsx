//import { useState } from "react";
import { useLocation, /* useNavigate ,*/ Link } from "react-router-dom";
import { Filter, LogOut } from "lucide-react";
import Footer from "../components/Footer";
import Questions from "../components/Questions";
import Gabarito from "../components/Gabarito";
import OptionsProf from "../components/OptionsProf";

const CreateQuiz = () => {
  //const navigate = useNavigate();
  const location = useLocation();
  const userLogado = location.state.user;

  const dbUser = JSON.parse(localStorage.getItem("UserQuiz"));

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
                    <button className="iconExit" href="">
                      <LogOut />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content container">
          <form className="create-painel">
            <h1 className="title-section">Novo Simulado</h1>
            <hr/>
            <div className="select-class">
              <div className="option-class">
                <h1 className="title-questions">Matéria</h1>
                <select name="" id="">
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
                <select name="" id="">
                  <OptionsProf db={dbUser} />
                  
                  {/* {
                    dbUser.filter(user => user.isTeacher === true).map(prof => (
                      <option key={prof.id} value={prof.id}>
                        {prof.nome}
                      </option>
                    ))
                  } */}
                </select>
              </div>
            </div>
            <hr />
            <div className="area-questions">
              <Questions numeroQ={1} />
              <Questions numeroQ={2} />
              <Questions numeroQ={3} />
              <Questions numeroQ={4} />
              <Questions numeroQ={5} />
              <Questions numeroQ={6} />
              <Questions numeroQ={7} />
              <Questions numeroQ={8} />
              <Questions numeroQ={9} />
              <Questions numeroQ={10} />
            </div>
            <div className="gabarito">
              <h1 className="title-questions">Gabarito</h1>
              <div className="gabarito-alt">
                <Gabarito alt={1}></Gabarito>
                <Gabarito alt={2}></Gabarito>
                <Gabarito alt={3}></Gabarito>
                <Gabarito alt={4}></Gabarito>
                <Gabarito alt={5}></Gabarito>
                <Gabarito alt={6}></Gabarito>
                <Gabarito alt={7}></Gabarito>
                <Gabarito alt={8}></Gabarito>
                <Gabarito alt={9}></Gabarito>
                <Gabarito alt={10}></Gabarito>
              </div>
            </div>
            <div className="enviarFormQuiz">
              <button className="formQuiz">Criar</button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CreateQuiz;
