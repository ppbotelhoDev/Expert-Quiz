import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const CardsQuiz = ({ dbQuiz, userQuiz, onDelete }) => {
  
  return dbQuiz.map((quiz) => (
    <div className="card-Quiz" key={quiz.id}>
      {(userQuiz.isTeacher === true || userQuiz.isTeacher === "director") && (
        <div className="trashCard">
          <button onClick={() => onDelete(quiz.id)}>
            <Trash />
          </button>
        </div>
      )}

      <div className="img-Quiz">
        <img src={`${quiz.img}`} alt={`Ícone de ${quiz.materia}`} width={65} />
      </div>

      <div className="nome-Quiz">
        <h4>
          Simulado {quiz.materia} <br />#{quiz.id}
        </h4>
      </div>

      <div className="legenda-Quiz">
        <p>{quiz.legenda}</p>
      </div>

      <div className="btn-Acessar-Quiz">
        <Link to={quiz.link}>Acessar</Link>
      </div>
    </div>
  ));
};

export default CardsQuiz;