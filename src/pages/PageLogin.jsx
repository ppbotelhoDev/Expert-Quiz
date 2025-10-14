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
      //Se sim ele valida se é Aluno ou Professor
      if (findUser.isTeacher) {
        //Se for professor ele navega ao dashboard do professor
        navigate("/DashboardProfessor", { state: { user: findUser } });
      } else {
        //Se não ele navega até o dashboard do aluno
        navigate("/DashboardAluno", { state: { user: findUser } });
      }
      //Caso nao seja encontrado tratamos aqui!
    } else {
      alert("Usuário ou senha incorreta");
    }
  };

  return (
    <div className="bodyLogin">
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
