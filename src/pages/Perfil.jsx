//import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { CircleUserRound, LockKeyhole } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Perfil = () => {
  //Inicializa os hooks
  const navigate = useNavigate();
  //Coleta os dados do user atual
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  //Lemos o usuário logado
  const {
    register: registerDados,
    handleSubmit: handleSubmitDados,
    formState: { errors: error },
    reset,
  } = useForm({
    defaultValues: {
      nomeCompleto: userAtual?.nomeCompleto || "",
      primeiroNome: userAtual?.primeiroNome || "",
      sobrenome: userAtual?.sobrenome || "", // Usa os dados do userAtual
      email: userAtual?.email || "",
      cpf: userAtual?.cpf || "",
      telefone: userAtual?.telefone || "",
      data: userAtual?.data || "", // Garanta que 'data' esteja AAAA-MM-DD
      // Adicione outros campos se necessário
    },
  });

  const {
    register: registerSenha, // Renomeia para clareza
    handleSubmit: handleSubmitSenha,
  } = useForm();

  //Verifica se o usuário está logado e o redireciona caso não
  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [userAtual, navigate]);

  //Permite a tela nao carregar caso o usuárionao esteja logad
  if (!userAtual) {
    return null;
  }

  //OnSubmits que salavarão os valores alterados
  const onSubmitDadosPessoais = (data) => {
    try {
      //Chama o banco de dados
      const dbUser = JSON.parse(localStorage.getItem("UserQuiz")) || [];

      //Procura o index do usuário atual
      const userIndex = dbUser.findIndex((user) => user.id === userAtual.id);

      //Confirma a existencia daquele id
      if (userIndex === -1) {
        alert("Erro: Usuário não encontrado no banco de dados.");
        return;
      }

      //Cria um objeto atualizado do usuário

      const usuarioAtualizado = {
        ...dbUser[userIndex],
        nomeCompleto: data.nomeCompleto, // Sobrescreve com os dados do form
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        data: data.data,
        primeiroNome: data.nomeCompleto.trim().split(" ")[0],
        sobrenome:
          data.nomeCompleto.trim().split(" ").length > 1
            ? data.nomeCompleto.trim().split(" ").pop()
            : "",
      };

      //cria uma nova lista para substituir a antiga
      const dbAtualizado = [
        ...dbUser.slice(0, userIndex), // coleta todos antes do usuário
        usuarioAtualizado, //O usuário
        ...dbUser.slice(userIndex + 1), //Pega todos depois do usuário
      ];

      //Salva no banco de dados
      localStorage.setItem("UserQuiz", JSON.stringify(dbAtualizado));

      //Atualiza os valores padrão do formulário com os dados recém-salvos
      reset(usuarioAtualizado);

      //Salva no session storage
      sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioAtualizado)
      );

      //Feedback pro usuário
      alert(`O perfil foi atualizado com sucesso!`);
    } catch {
      console.error("Erro ao salvar perfil:", error);
      alert("Ocorreu um erro ao tentar salvar as alterações.");
    }
  };

  //onSubmit da senha
  const onSubmitSenha = (data) => {
    //Chama o banco de dados
      const dbUser = JSON.parse(localStorage.getItem("UserQuiz")) || [];

      //Procura o index do usuário atual
      const userIndex = dbUser.findIndex((user) => user.id === userAtual.id);

      //Confirma a existencia daquele id
      if (userIndex === -1) {
        alert("Erro: Usuário não encontrado no banco de dados.");
        return;
      }


      //Verifica se as senhas sao identicas
      if (data.novaSenha === userAtual.senha) {
        alert("Senha atual incorreta")
        return
      }
      if(!data.novaSenha || data.novaSenha !== data.confirmaSenha){
        alert("As senhas não são iguais")
        return
      }
      const senhaAtualizada = {
        ...dbUser[userIndex],
        senha: data.novaSenha
      }
 
      console.log(senhaAtualizada)

      const dbAtualizado = [
        ...dbUser.slice(0, userIndex), // coleta todos antes do usuário
        senhaAtualizada, //O usuário
        ...dbUser.slice(userIndex + 1), //Pega todos depois do usuário
      ];

      //Salva no banco de dados
      localStorage.setItem("UserQuiz", JSON.stringify(dbAtualizado));

      //Salva no session storage
      sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(senhaAtualizada)
      );
  };

  return (
    <div className="div-pai">
      <Header />
      <main className="main-content container mg-sup">
        <h1 className="title-sections">Meu perfil</h1>
        <div className="main-camp">
          {/* ===== Secction 1 ===== */}
          <form
            onSubmit={handleSubmitDados(onSubmitDadosPessoais)}
            className="secction1"
            autoComplete="off"
          >
            <div className="title-camp">
              <div className="title-sup">
                <div className="imgUser">
                  <CircleUserRound />
                </div>
                <div className="titleUSer">
                  <h3>Dados Pessoais</h3>
                </div>
              </div>
              <div className="id-profile">
                <h2>#{userAtual.id}</h2>
              </div>
            </div>
            <div className="credenciais">
              <div className="photo-user">
                <div>
                  <h1>
                    {userAtual.primeiroNome[0]}
                    {userAtual.sobrenome[0]}
                  </h1>
                  <div>
                    <p>
                      {userAtual.isTeacher === "director"
                        ? "Diretor"
                        : userAtual.isTeacher === true
                        ? "Professor(a)"
                        : "Aluno(a)"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="credenciais-user">
                <div className="input-nome">
                  <p>Nome Completo</p>
                  <input
                    type="text"
                    placeholder={userAtual.nomeCompleto}
                    autoComplete="Off"
                    {...registerDados("nomeCompleto")}
                  />
                </div>
                <div className="input-email">
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder={userAtual.email}
                    autoComplete="off"
                    {...registerDados("email")}
                  />
                </div>
                <div className="lastRow">
                  <div className="input-cpf">
                    <p>CPF</p>
                    <input
                      type="number"
                      placeholder={userAtual.cpf}
                      autoComplete="off"
                      {...registerDados("cpf")}
                      readOnly
                    />
                  </div>
                  <div className="input-tel">
                    <p>Telefone</p>
                    <input
                      type="tel"
                      placeholder={userAtual.telefone}
                      autoComplete="off"
                      {...registerDados("telefone")}
                    />
                  </div>
                  <div className="input-data">
                    <p>Data de Nascimento</p>
                    <input
                      type="date"
                      placeholder={userAtual.data}
                      autoComplete="off"
                      {...registerDados("data")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="btn-send-user">
              <button
                type="button"
                onClick={() => navigate("/Dashboard")}
                className="btn-submit btn-branco"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-submit">
                Salvar Alterações
              </button>
            </div>
          </form>

          {/* ===== Secction 2 ===== */}
          <form
            onSubmit={handleSubmitSenha(onSubmitSenha)}
            className="secction2"
            autoComplete="off"
          >
            <div className="title-camp">
              <div className="title-sup">
                <div className="imgUser">
                  <LockKeyhole />
                </div>
                <div className="titleUSer">
                  <h3>Segurança da Conta</h3>
                </div>
              </div>
            </div>
            <div className="credenciais">
              <div className="credenciais-senha">
                <div className="update-senha">
                  <p>Senha Atual</p>
                  <input
                    type="password"
                    autoComplete="new-password"
                    placeholder="**********"
                    {...registerSenha("senhaAtual")}
                  />
                </div>
                <div className="update-senha">
                  <p>Nova Senha</p>
                  <input type="password" autoComplete="new-password" {...registerSenha("novaSenha")}/>
                </div>
                <div className="update-senha">
                  <p>Repita a Nova Senha</p>
                  <input type="password" autoComplete="new-password" {...registerSenha("confirmaSenha")} />
                </div>
              </div>
            </div>
            <div className="btn-send-user">
              <button type="submit" className="btn-submit-senha">
                Redefinir senha
              </button>
            </div>
          </form>
          {/* ===== Fim das Secctios ===== */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil;
