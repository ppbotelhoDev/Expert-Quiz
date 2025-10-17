import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  //Funcão Naviagte para navegar entre as paginas por meio JS
  const navigate = useNavigate();

  //DataBase
  const dbUser = JSON.parse(localStorage.getItem("UserQuiz")) || [
    {
      id: 9999,
      nome: "Usuário Padrão",
      isTeacher: true,
      senha: "admin123",
    },
  ];

  //Const de State para área de login:
  const [inputId, setInputId] = useState("");
  const [inputSenha, setInputSenha] = useState("");

  //Handle de dados e validação de usuários
  const handleLogin = (event) => {
    //Evita o reinicio da página
    event.preventDefault();

    //Procura e valida se o usuário existe
    const findUser = dbUser.find(
      (user) => user.id === Number(inputId) && user.senha === inputSenha
    );
    //Valida se encontrou ou não
    if (findUser) {
      // SALVE O USUÁRIO LOGADO AQUI!
      sessionStorage.setItem("usuarioLogado", JSON.stringify(findUser));

      if (findUser.isTeacher || findUser.isTeacher == "director") {
        navigate("/DashboardProfessor", { state: { user: findUser } });
      } else {
        navigate("/DashboardAluno", { state: { user: findUser } });
      }
    } else {
      alert("Usuário ou senha incorreta");
    }
  };

  return (
    <div className="bodyLogin main-content">
      <div className="cardLogin">
        <img src="imgLogin.png" alt="" />
        <form onSubmit={handleLogin} className="formLogin" action="">
          <img src="logoExpert.png" alt="" />
          <input
            placeholder="Id do usuário"
            type="number"
            className="inputCard"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <input
            placeholder="Senha do usuário"
            type="password"
            className="inputCard"
            value={inputSenha}
            onChange={(e) => setInputSenha(e.target.value)}
          />

          <button type="submit" className="btnSubmit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageLogin;
