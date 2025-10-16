import { Trash } from "lucide-react";

const CardsQuiz = ({ dbQuiz, userQuiz, onDelete }) => {
  return dbQuiz.map((quiz) => (
    
      <div className="card-Quiz">
        {userQuiz.isTeacher == true ? (
          <div className="trashCard">
            <button onClick={() => onDelete(quiz.id)}>
              <Trash />
            </button>
          </div>
        ) : null}

        <div className="img-Quiz">
          <img src={quiz.img} alt="" width={65} />
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
          <a href={quiz.link}>Acessar</a>
        </div>
      </div>
   
  ));
};

export default CardsQuiz;
