//Import estilo/Css
import "./assets/styles.css";
//Import Ferramentas
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
//Import Páginas
import PageLogin from "./pages/PageLogin.jsx"; 
import DashboardProf from "./pages/Dashboard.jsx"; 
import CadastroUser from "./pages/CadastroUser.jsx";
import Perfil from "./pages/Perfil.jsx";
import Notas from "./pages/Notas.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import Simulado from "./pages/Simulado.jsx";


function App() {
  useEffect(() => {
    document.querySelector("link[rel*='icon']").href = "logo.png"
  }, [])
  return (
    <>
      <Routes>
        <Route path="/Login" element={<PageLogin />} />
        <Route path="/Dashboard" element={<DashboardProf />} />
        <Route path="/Notas" element={<Notas />} />
        <Route path="/Cadastro" element={<CadastroUser />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
        <Route path="/Simulado" element={<Simulado/>} />
      </Routes>
    </>
  );
}

export default App;
