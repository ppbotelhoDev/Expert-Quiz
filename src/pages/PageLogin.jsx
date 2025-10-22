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
      senha: "userPadrao123",
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
      (user) =>
        (user.id === Number(inputId) || user.cpf === Number(inputId)) &&
        user.senha === inputSenha
    );
    //Valida se encontrou ou não
    if (findUser) {
      //Se sim, redireciona o usuário para o Dashboard
      sessionStorage.setItem("usuarioLogado", JSON.stringify(findUser));
      navigate("/Dashboard");
    } else {
      //Se não emite um alert de "usuário nao encontrado"
      alert("Usuário ou senha incorreta");
    }
  };

  return (
    <div className="bodyLogin main-content">
      <div className="cardLogin">
        <div className="div-img-login">
          <img className="img-login" src="imgLogin.png" />
        </div>
        <form onSubmit={handleLogin} className="form-login">
          <div className="img-formLogin">
            <img src="logoVestibule.png" alt="Logo Vestibule" width={150} />
          </div>
          <div className="input-login">
            <input
              placeholder="Id do usuário"
              type="number"
              className="input-card"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />

            <input
              placeholder="Senha do usuário"
              type="password"
              className="input-card"
              value={inputSenha}
              onChange={(e) => setInputSenha(e.target.value)}
            />
            <button type="submit" className="btnSubmit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageLogin;
