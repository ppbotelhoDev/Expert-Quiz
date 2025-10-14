import { useLocation } from "react-router-dom";

const DashboardProf = () => {

  const location = useLocation()

  const profLogado = location.state.user

  return (
    <div>
      <h1>Olá, {profLogado.nome}</h1>
      <p>Bem-vindo! Aqui está o seu dashboard.</p>
    </div>
  );
}

export default DashboardProf;