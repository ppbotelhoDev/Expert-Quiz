// Em /pages/PaginaSimulado.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function PaginaSimulado() {
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  // --- Estados do Componente ---
  const { quizId } = useParams();
  const [perguntas, setPerguntas] = useState([]);
  const [tituloQuiz, setTituloQuiz] = useState("");
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [notaFinal, setNotaFinal] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  // --- Efeito para Carregar o Quiz do localStorage (Versão Ideal) ---
  useEffect(() => {
    try {
      setLoading(true);

      // 1. Busca o banco MESTRE
      const dbCardQuizString = localStorage.getItem("DbCardQuiz"); // <-- Lendo do banco NOVO
      if (!dbCardQuizString) {
        throw new Error("'DbCardQuiz' não encontrado no localStorage.");
      }

      // 2. Converte o array mestre
      const dbCardQuizData = JSON.parse(dbCardQuizString);

      // 3. Acha o quiz específico DENTRO do mestre
      const quizData = dbCardQuizData.find(
        (quiz) => String(quiz.id) === String(quizId) // <-- Com a comparação correta
      );

      if (!quizData) {
        throw new Error(`Quiz com ID ${quizId} não encontrado no DbCardQuiz.`);
      }

      // 4. Salva os dados desse quiz no estado
      setPerguntas(quizData.perguntas || []);
      setTituloQuiz(quizData.materia || `Simulado ${quizId}`);
    } catch (error) {
      console.error("Erro ao carregar o simulado do localStorage:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  // --- Função para Salvar a Resposta do Usuário no Estado ---
  const handleSelecionarResposta = (
    idDaPerguntaTexto,
    respostaSelecionadaString
  ) => {
    setRespostasUsuario((prevRespostas) => ({
      ...prevRespostas,
      [idDaPerguntaTexto]: respostaSelecionadaString,
    }));
  };

  /// --- O CÓDIGO PRINCIPAL QUE CALCULA E SALVA TUDO (CORRIGIDO) ---
  const finalizarQuiz = () => {
    // ETAPA 1: CALCULAR A NOTA DESTE SIMULADO (Sem mudanças, está perfeito)
    let acertosContados = 0;

    perguntas.forEach((pergunta) => {
      const respostaCorretaString =
        pergunta.opcoes[pergunta.respostaCorretaIndex];
      const respostaDoUsuario = respostasUsuario[pergunta.texto];

      if (respostaCorretaString === respostaDoUsuario) {
        acertosContados++;
      }
    });

    const notaCalculada =
      perguntas.length > 0 ? (acertosContados / perguntas.length) * 10 : 0; // Tenta salvar tudo no localStorage.

    try {
      // ETAPA 2: ATUALIZAR O RECORDE PESSOAL DO ALUNO (UserQuiz)

      const userQuizString = localStorage.getItem("UserQuiz");
      if (!userQuizString) {
        throw new Error("'UserQuiz' não encontrado no localStorage.");
      }
      const userQuizData = JSON.parse(userQuizString); // Pega o ARRAY de usuários // --- INÍCIO DA CORREÇÃO --- // Em vez de pegar o [0], usamos o 'userAtual' que você pegou do sessionStorage

      // 1. Pega o ID do usuário que está logado na sessão
      const userId = userAtual.id;

      // 2. Acha o ÍNDICE (posição) desse usuário dentro do array 'UserQuiz'
      const userIndex = userQuizData.findIndex(
        (user) => String(user.id) === String(userId)
      ); // 3. Verificação de segurança: se não achar o usuário, para a função

      if (userIndex === -1) {
        throw new Error(
          `Usuário logado (ID: ${userId}) não foi encontrado no 'UserQuiz' do localStorage.`
        );
      } // O resto da sua lógica agora funciona, pois 'userIndex' está correto
      // --- FIM DA CORREÇÃO ---

      if (!userQuizData[userIndex].notas) {
        userQuizData[userIndex].notas = {};
      }

      const notaAntiga = userQuizData[userIndex].notas[quizId] || 0;

      if (notaCalculada > notaAntiga) {
        userQuizData[userIndex].notas[quizId] = notaCalculada;
        localStorage.setItem("UserQuiz", JSON.stringify(userQuizData));
        console.log(
          `[UserQuiz] Recorde pessoal atualizado para ${quizId}: ${notaCalculada.toFixed(
            1
          )}`
        );
      } // ETAPA 3: ATUALIZAR A NOTA GERAL DO QUIZ (dbCardQuiz)

      // (Esta etapa já estava correta, pois ela só precisa do 'userId',
      // que agora pegamos corretamente do 'userAtual')

      const dbCardQuizString = localStorage.getItem("DbCardQuiz");
      if (!dbCardQuizString) {
        throw new Error("'dbCardQuiz' não encontrado no localStorage.");
      }

      const dbCardQuizData = JSON.parse(dbCardQuizString);

      const quizIndex = dbCardQuizData.findIndex(
        (quiz) => String(quiz.id) === String(quizId)
      );

      if (quizIndex === -1) {
        throw new Error(`Quiz ${quizId} não encontrado no 'DbCardQuiz'.`);
      }

      if (!dbCardQuizData[quizIndex].notas) {
        dbCardQuizData[quizIndex].notas = [];
      } // Esta parte agora funciona, pois 'userId' está correto

      dbCardQuizData[quizIndex].notas.push({
        userId: userId, // userId pego do userAtual
        nota: notaCalculada,
        data: new Date().toISOString(),
      }); // Recalcula a 'notaMedia'

      const todasAsNotasDoQuiz = dbCardQuizData[quizIndex].notas.map(
        (n) => n.nota
      );
      const somaDasNotas = todasAsNotasDoQuiz.reduce(
        (acc, nota) => acc + nota,
        0
      );
      const novaMedia = somaDasNotas / todasAsNotasDoQuiz.length;

      dbCardQuizData[quizIndex].notaMedia = novaMedia;

      localStorage.setItem("DbCardQuiz", JSON.stringify(dbCardQuizData));
      console.log(
        `[dbCardQuiz] Média geral do quiz ${quizId} atualizada para ${novaMedia.toFixed(
          1
        )}`
      );
    } catch (error) {
      console.error("Erro GERAL ao salvar resultados no localStorage:", error);
      // BÔNUS: Mostre o erro na tela para o usuário (e para você)
      setErro(error.message);
    } // ETAPA 4: ATUALIZAR A TELA (UI) (Sem mudanças, está perfeito)

    setNotaFinal(notaCalculada);
    setAcertos(acertosContados);
    setQuizFinalizado(true);
  };

  // --- O RETURN (JSX) QUE MONTA A PÁGINA ---

  return (
    <div className="div-pai">
      <Header />

      <main className="main-content">
        <div className="container mg-sup">
          {/* Renderização Condicional: Carregando */}
          {loading && <div>Carregando simulado...</div>}

          {/* Renderização Condicional: Erro */}
          {erro && <div>Erro: {erro}</div>}

          {/* Renderização Condicional: Quiz Finalizado */}
          {quizFinalizado && (
            <div className="center-item">
              <div className="box-finalizado ">
                <h2>Simulado Finalizado!</h2>
                <h3>
                  {tituloQuiz} #{quizId}
                </h3>
                <div className="legenda-final">
                  <p>
                    {notaFinal > 8
                      ? `PARABÉNS!!! Sua nota foi: ${notaFinal}`
                      : `Sua nota foi: ${notaFinal}`}
                  </p>
                  <p>
                    Você acertou {acertos} de {perguntas.length} perguntas.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/Dashboard")}
                  className="botao-finalizar"
                >
                  {userAtual.isTeacher === true
                    ? "Voltar ao início"
                    : "Voltar ao Dashboard"}
                </button>
              </div>
            </div>
          )}

          {/* Renderização Condicional: O Quiz (Formulário) */}
          {!loading && !erro && !quizFinalizado && (
            <>
              <h1 className="title-section">
                Simulado {tituloQuiz} #{quizId}
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  finalizarQuiz();
                }}
              >
                {perguntas.length > 0 ? (
                  perguntas.map((pergunta, index) => (
                    <div key={pergunta.texto} className="pergunta-bloco">
                      <h3>
                        {index + 1}. {pergunta.texto}
                      </h3>

                      <div className="opcoes-bloco">
                        {pergunta.opcoes.map((opcaoString, opcaoIndex) => (
                          <div key={opcaoIndex}>
                            <input
                              type="radio"
                              name={pergunta.texto}
                              value={opcaoString}
                              checked={
                                respostasUsuario[pergunta.texto] === opcaoString
                              }
                              onChange={() =>
                                handleSelecionarResposta(
                                  pergunta.texto,
                                  opcaoString
                                )
                              }
                              required
                            />
                            <label className="option-label">
                              {opcaoString}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Este simulado não contém perguntas.</p>
                )}

                <button
                  type="submit"
                  className="botao-finalizar"
                  disabled={perguntas.length === 0}
                >
                  Finalizar Simulado
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PaginaSimulado;
