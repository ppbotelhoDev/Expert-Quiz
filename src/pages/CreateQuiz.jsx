import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Questions from "../components/Questions";
import Gabarito from "../components/Gabarito";
import OptionsProf from "../components/OptionsProf";
import { useForm } from "react-hook-form";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (!userAtual) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [userAtual, navigate]);

  if (!userAtual) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  //const dbUser = JSON.parse(localStorage.getItem("UserQuiz")) || [];

  const onSubmit = (data) => {
    // 1. Pega o banco mestre
    const dbAntigo = JSON.parse(localStorage.getItem("DbCardQuiz")) || [];

    // 2. Lógica do ID
    let idUnico;
    if (dbAntigo.length === 0) {
      idUnico = "1101"; // Começar de um ID base
    } else {
      // Garante que estamos pegando apenas IDs numéricos válidos
      const idsNumericos = dbAntigo.map(quiz => Number(quiz.id)).filter(id => !isNaN(id));
      const maiorId = Math.max(0, ...idsNumericos); // Usa 0 como base caso o array esteja vazio
      const proximoId = maiorId + 1;
      idUnico = proximoId.toString(); // Salvamos como string
    }

    // 3. Criar o ÚNICO objeto de quiz, 100% completo
    const novoQuizCompleto = {
      materia: data.materia,
      img: `${data.materia.toLowerCase()}.png`,
      id: idUnico,
      legenda: data.legenda,
      link: `/quiz/${idUnico}`, 
      
      // (ASSUMINDO que seus componentes <Questions> e <Gabarito> 
      // já estão formatando 'data.perguntas' como um array de objetos)
      perguntas: data.perguntas, 
      
      // === OS CAMPOS FALTANTES ===
      notaMedia: 0, // Um quiz novo sempre começa com média 0
      notas: []     // Um quiz novo sempre começa sem nenhuma nota
    };

    // 4. Adicionar o novo quiz COMPLETO ao array mestre
    // (Adicionando no começo, como você fez)
    const dbAtualizado = [novoQuizCompleto, ...dbAntigo];
    
    // 5. Salvar APENAS o 'DbCardQuiz'
    localStorage.setItem("DbCardQuiz", JSON.stringify(dbAtualizado));

    // 6. REMOVER a linha que salva a cópia duplicada
    // localStorage.setItem(`quiz_${idUnico}`, JSON.stringify(quizCompleto)); // <-- LINHA REMOVIDA

    alert("Simulado criado com sucesso!");
    navigate("/Dashboard");
  };

  return (
    <div className="div-pai">
      <Header userAtual={userAtual} logout={handleLogout} />

      <main className="main-content container mg-sup">
        <h1 className="title-section">Novo Simulado</h1>
        <form className="create-painel" onSubmit={handleSubmit(onSubmit)}>
          <div className="select-class">
            <div className="option-class">
              <h1 className="title-sections">Matéria</h1>
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
  );
};

export default CreateQuiz;
