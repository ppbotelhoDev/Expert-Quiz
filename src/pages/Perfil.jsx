//import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircleUserRound, LockKeyhole } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Perfil = () => {
  const navigate = useNavigate();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  //const dbUser = JSON.parse(localStorage.getItem("UserQuiz"));

  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/Login");
    }
  }, [userAtual, navigate]);

  return (
    <div className="div-pai">
      <Header />
      <main className="main-content container mg-sup">
        <h1 className="title-sections">Meu perfil</h1>
        <div className="main-camp">
          {/* ===== Secction 1 ===== */}
          <form className="secction1" autoComplete="off">
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
                    {userAtual.PrimeiroNome[0]}
                    {userAtual.Sobrenome[0]}
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
                  />
                </div>
                <div className="input-email">
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder={userAtual.email}
                    autoComplete="off"
                  />
                </div>
                <div className="lastRow">
                  <div className="input-cpf">
                    <p>CPF</p>
                    <input
                      type="number"
                      placeholder={userAtual.cpf}
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-tel">
                    <p>Telefone</p>
                    <input
                      type="tel"
                      placeholder={userAtual.telefone}
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-data">
                    <p>Data de Nascimento</p>
                    <input
                      type="date"
                      placeholder={userAtual.data}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="btn-send-user">
              <button onClick={() => navigate("/Dashboard")} className="btn-submit btn-branco">Cancelar</button>
              <button className="btn-submit">Salvar Alterações</button>
            </div>
          </form>

          {/* ===== Secction 2 ===== */}
          <form className="secction2" autoComplete="off">
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
                  />
                </div>
                <div className="update-senha">
                  <p>Nova Senha</p>
                  <input type="password" autoComplete="new-password" />
                </div>
                <div className="update-senha">
                  <p>Repita a Nova Senha</p>
                  <input type="password" autoComplete="new-password" />
                </div>
              </div>
            </div>
            <div className="btn-send-user">
              <button className="btn-submit-senha">Redefinir senha</button>
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
