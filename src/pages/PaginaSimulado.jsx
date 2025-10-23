// Em /pages/PaginaSimulado.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// 1. Importe seus componentes de layout
import Header from "../components/Header"; // (Ajuste o caminho se necessário)
import Footer from "../components/Footer"; // (Ajuste o caminho se necessário)
import Dashboard from "../components/Dashboard";

function PaginaSimulado() {
  // --- TODA A LÓGICA QUE DEFINIMOS ANTES ---

  const { quizId } = useParams();
  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  // Estados
  const [perguntas, setPerguntas] = useState([]);
  const [tituloQuiz, setTituloQuiz] = useState("");
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [notaFinal, setNotaFinal] = useState(0);
  const [acertos, setAcertos] = useState(0); // Adicionei para mostrar no final
  const [erro, setErro] = useState(null);

  // Efeito para Buscar os dados (Corrigido para sua estrutura)
  useEffect(() => {
    try {
      setLoading(true);
      const chaveDoQuiz = `quiz_${quizId}`;
      const dadosString = localStorage.getItem(chaveDoQuiz);

      if (!dadosString) {
        throw new Error(`Simulado com ID ${quizId} não encontrado.`);
      }

      const dadosDoQuizArray = JSON.parse(dadosString);

      if (!dadosDoQuizArray || dadosDoQuizArray.length === 0) {
        throw new Error(`Dados do quiz ${quizId} estão vazios.`);
      }
      const quizData = dadosDoQuizArray[0];

      setPerguntas(quizData.perguntas || []);
      setTituloQuiz(quizData.materia || `Simulado ${quizId}`);
    } catch (error) {
      console.error("Erro ao carregar quiz do localStorage:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  // Lógica de Interação (Selecionar Resposta)
  const handleSelecionarResposta = (
    idDaPerguntaTexto,
    respostaSelecionadaString
  ) => {
    setRespostasUsuario((prevRespostas) => ({
      ...prevRespostas,
      [idDaPerguntaTexto]: respostaSelecionadaString,
    }));
  };

  // Lógica de Finalizar (Corrigida para sua estrutura)
  const finalizarQuiz = () => {
    let acertosContados = 0;

    perguntas.forEach((pergunta) => {
      const respostaCorretaString =
        pergunta.opcoes[pergunta.respostaCorretaIndex];
      const respostaDoUsuario = respostasUsuario[pergunta.texto];

      if (respostaCorretaString === respostaDoUsuario) {
        acertosContados++; // Incrementa os acertos
      }
    });

    const notaCalculada = (acertosContados / perguntas.length) * 10;
    setNotaFinal(notaCalculada);
    setAcertos(acertosContados); // Salva os acertos no estado
    setQuizFinalizado(true); // Finaliza o quiz

    // Salvar o resultado no localStorage
    try {
      const resultadosAntigosString =
        localStorage.getItem("resultados_gerais") || "[]";
      const resultadosAntigos = JSON.parse(resultadosAntigosString);

      const novoResultado = {
        quizId: quizId,
        materia: tituloQuiz,
        nota: notaCalculada,
        acertos: acertosContados,
        totalPerguntas: perguntas.length,
        respostas: respostasUsuario,
        data: new Date().toISOString(),
      };

      const novosResultados = [...resultadosAntigos, novoResultado];
      localStorage.setItem(
        "resultados_gerais",
        JSON.stringify(novosResultados)
      );
    } catch (error) {
      console.error("Erro ao salvar resultado no localStorage:", error);
    }
  };

  // --- O NOVO RETURN COM SEU LAYOUT ---

  return (
    <div className="div-pai">
      <Header />

      <main className="main-content">
        <div className="container mg-sup">
          {/* Aqui começa o conteúdo dinâmico.
            Vamos renderizar condicionalmente (loading, erro, finalizado, ou o quiz)
            DENTRO do seu container.
          */}

          {loading && <div>Carregando simulado...</div>}

          {erro && <div>Erro: {erro}</div>}

          {quizFinalizado && (
            <div>
              <h2>Simulado Finalizado!</h2>
              <h3>{tituloQuiz}</h3>
              <p>Sua nota foi: {notaFinal.toFixed(1)} de 10</p>
              <p>
                Você acertou {acertos} de {perguntas.length} perguntas.
              </p>
              <button>
                {userAtual.isTeacher === false ? "Simulados" : "Dashboard"}
              </button>
            </div>
          )}

          {/* Se não estiver carregando, nem com erro, nem finalizado, mostra o quiz */}
          {!loading && !erro && !quizFinalizado && (
            <>
              <h1 className="title-section">
                Simulado de {tituloQuiz} #{quizId}
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  finalizarQuiz();
                }}
              >
                {perguntas.length > 0 ? (
                  perguntas.map((pergunta, index) => (
                    <div key={pergunta.texto} className="question-bloco">
                      <h3 className="">
                        {index + 1}. {pergunta.texto}
                      </h3>

                      <div className="opcoes-bloco">
                        {pergunta.opcoes.map((opcaoString, opcaoIndex) => (
                          <div key={opcaoIndex} className="option-label">
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
                            <label>{opcaoString}</label>
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
