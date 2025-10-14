import "./assets/styles.css";
import { Routes, Route } from "react-router-dom"; // 1. Importe as ferramentas
import PageLogin from "./pages/PageLogin.jsx"; // 2. Importe suas páginas
import DashboardProf from "./pages/DashboardProf.jsx"; // 2. Importe suas páginas
import DashboardAluno from "./pages/DashboardAluno.jsx";
import CadastroUser from "./pages/CadastroUser.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.querySelector("link[rel*='icon']").href = "logo.png"
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLogin />} />
        <Route path="/DashboardAluno" element={<DashboardAluno />} />
        <Route path="/DashboardProfessor" element={<DashboardProf />} />
        <Route path="/Cadastro" element={<CadastroUser />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
