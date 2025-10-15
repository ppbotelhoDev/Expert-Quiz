import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="container container-footer">
        <div className="footer-top">
          <Link to={"/"} href="">
            Suporte
          </Link>
          <Link to={"/"} href="">
            Política de Privacidade
          </Link>
          <Link to={"/"} href="">
            Política de reembolso
          </Link>
          <Link to={"/"} href="">
            Termos de serviço
          </Link>
          <Link to={"/"} href="">
            Dashboard
          </Link>
          <Link to={"/"} href="">
            Criar simulado
          </Link>
          <Link to={"/"} href="">
            Cadastrar aluno
          </Link>
          <Link to={"/"} href="">
            Notas
          </Link>
        </div>
        <div className="footer-bottom">
          <p>&#169;2025 Expert Vest</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
