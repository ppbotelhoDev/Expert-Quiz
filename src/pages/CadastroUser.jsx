// 1. Importações Essenciais
import { useForm } from "react-hook-form"; // Para gerir o formulário
import { useNavigate, Link } from "react-router-dom"; // Para navegação
import { useEffect } from "react"; // Para efeitos secundários (guarda de rota)
import { UserPlus } from "lucide-react"; // Ícone para o título (opcional)

// Importação seus componentes de layout (VERIFIQUE OS CAMINHOS!)
import Header from "../components/Header";
import Footer from "../components/Footer";

// Lista de matérias (já podemos deixar aqui)
const MATERIAS_DISPONIVEIS = [
  "Matemática",
  "Português",
  "Física",
  "Química",
  "Biologia",
  "Geografia",
  "História",
  "Tecnologia",
  "Inglês",
  "Filosofia",
  "Sociologia",
];

// 2. Definição do Componente Funcional
const CadastroUser = () => {
  //Inicialização dos Hooks
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userAtual = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  //Variáveis

  //Verifica se o usuário está logado antes de renderizar a página
  useEffect(() => {
    if (!userAtual) {
      alert("Faça login para acessar esta página.");
      navigate("/Login");
    }
  }, [userAtual, navigate]);

  //Caso não estiver logado, a pagina não carrega
  if (!userAtual) {
    return null;
  }

  // A função onSubmit (placeholder por enquanto)
  const onSubmit = (data) => {
    //Extrair Primeiro Nome e Sobrenome
    const nomeCompleto = data.nomeCompleto.trim();
    const partesNome = nomeCompleto.split(" ");
    const primeiroNome = partesNome[0];
    const sobrenome =
      partesNome.length > 1 ? partesNome[partesNome.length - 1] : ""; // Pega o último nome

    //Ler o banco de dados atual
    const dbUsers = JSON.parse(localStorage.getItem("UserQuiz")) || [];

    //Gerar Novo ID Sequencial
    let novoId;
    if (dbUsers.length === 1) {
      novoId = 129834765;
    } else {
      // Encontra o maior ID existente e soma 1
      novoId = Math.floor(Math.random() * (999999998 - 111111111 + 1)) + 1;
    }

    //Gerar senha Genérica ex: teste123
    const senhaGenerica = `Vestibule${novoId}`;

    //Montar o Objeto do Novo Usuário
    const novoUsuario = {
      id: novoId,

      isTeacher: data.tipoUsuario === "professor",
      nomeCompleto: nomeCompleto,
      primeiroNome: primeiroNome,
      sobrenome: sobrenome,
      email: data.email,
      cpf: data.cpf,
      data: data.data,
      telefone: data.telefone,
      senha: senhaGenerica,

      // Adiciona campos específicos dependendo do tipo
      ...(data.tipoUsuario === "professor"
        ? { materias: data.materias || [] } // Garante que seja um array, mesmo que nenhuma matéria seja marcada
        : { notas: {}, notaMedia: 0 }),
    };

    //Adicionar o Novo Usuário à Lista
    const dbAtualizado = [novoUsuario, ...dbUsers];

    //Salvar de Volta no localStorage
    localStorage.setItem("UserQuiz", JSON.stringify(dbAtualizado));

    //Feedback e Redirecionamento
    alert(
      `${
        data.tipoUsuario === "professor" ? "Professor" : "Aluno"
      } cadastrado com sucesso! ID: ${novoId}. A senha inicial é: ${senhaGenerica}`
    );
    navigate("/Dashboard");
  };

  // Observar o campo tipoUsuario
  const tipoUsuarioSelecionado = watch("tipoUsuario");

  return (
    <div className="div-pai">
      <Header />

      {/* ===== INÍCIO DO CONTEÚDO DO MAIN ===== */}
      <main className="main-content container mg-sup">
        <h1 className="title-sections">Cadastro de Usuários</h1>
        {/* Formulário principal conectado ao handleSubmit */}
        <form
          className="main-cadastro card-branco"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* --- Título do Card --- */}
          <div className="title-camp">
            <div className="title-sup">
              <div className="imgUser">
                <UserPlus />
              </div>
              <div className="titleUSer">
                <h3>Cadastrar usuário</h3>
              </div>
            </div>
          </div>
          <hr />
          {/* --- SEÇÃO DADOS PESSOAIS --- */}
          <div className="form-section">
            <h2>Dados Pessoais</h2>
            <div className="form-grid-cadastro">
              <div className="form-group-cadastro">
                <label htmlFor="nomeCompleto">Nome Completo*</label>
                <input
                  id="nomeCompleto"
                  type="text"
                  placeholder="Nome completo do usuário"
                  autoComplete="off"
                  {...register("nomeCompleto", {
                    required: "Nome completo é obrigatório",
                  })}
                />
                {errors.nomeCompleto && (
                  <p className="error-message">{errors.nomeCompleto.message}</p>
                )}
              </div>
              {/* Campo Email */}
              <div className="form-group-cadastro">
                <label htmlFor="email">E-mail*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  autoComplete="off"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Formato de e-mail inválido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              {/* Campo CPF */}
              <div className="form-group-cadastro">
                <label htmlFor="cpf">CPF*</label>
                <input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  {...register("cpf", { required: "CPF é obrigatório" })}
                />
                {errors.cpf && (
                  <p className="error-message">{errors.cpf.message}</p>
                )}
              </div>
              {/* Campo Data de Nascimento */}
              <div className="form-group-cadastro">
                <label htmlFor="dataNascimento">Data de Nascimento*</label>
                <input
                  id="dataNascimento"
                  type="date"
                  {...register("data", { required: "Data é obrigatória" })}
                />
                {errors.data && (
                  <p className="error-message">{errors.data.message}</p>
                )}
              </div>
              {/* Campo Telefone */}
              <div className="form-group-cadastro">
                <label htmlFor="telefone">Telefone*</label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 90000-0000"
                  autoComplete="off"
                  {...register("telefone", {
                    required: "Telefone é obrigatório",
                  })}
                />
                {errors.telefone && (
                  <p className="error-message">{errors.telefone.message}</p>
                )}
              </div>
            </div>
            {/* Fim .form-grid-cadastro */}
          </div>
          {/* Fim .form-section Dados Pessoais */}
          <hr />

          {/* --- SEÇÃO TIPO DE USUÁRIO --- */}
          <div className="form-section">
            <h2>Tipo de Conta</h2>
            <div className="form-group-tipo-usuario">
              <div className="user-box-verify">
                {/* Reutiliza suas classes */}
                {/* Opção Professor */}
                <div
                  className={`box-radio ${
                    tipoUsuarioSelecionado === "professor" ? "selecionado" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="professor"
                    value="professor"
                    {...register("tipoUsuario", {
                      required: "Selecione o tipo",
                    })}
                  />
                  <label htmlFor="professor">Professor</label>
                </div>
                {/* Opção Aluno */}
                <div
                  className={`box-radio ${
                    tipoUsuarioSelecionado === "aluno" ? "selecionado" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="aluno"
                    value="aluno"
                    {...register("tipoUsuario", {
                      required: "Selecione o tipo",
                    })}
                  />
                  <label htmlFor="aluno">Aluno</label>
                </div>
              </div>
              {errors.tipoUsuario && (
                <p className="error-message">{errors.tipoUsuario.message}</p>
              )}
            </div>
          </div>
          <hr />

          {/* --- SEÇÃO CONDICIONAL MATÉRIAS --- */}
          {tipoUsuarioSelecionado === "professor" && (
            <>
              <div className="form-section">
                <h2>Matérias Lecionadas*</h2>
                <div className="checkbox-grid">
                  {MATERIAS_DISPONIVEIS.map((materia) => (
                    <div className="checkbox-group" key={materia}>
                      <input
                        type="checkbox"
                        id={`materia-${materia}`}
                        value={materia}
                        {...register("materias", {
                          required: "Selecione pelo menos uma matéria",
                        })}
                      />
                      <label htmlFor={`materia-${materia}`}>{materia}</label>
                    </div>
                  ))}
                </div>
                {errors.materias && (
                  <p className="error-message">{errors.materias.message}</p>
                )}
              </div>
              <hr />
            </>
          )}
          {/* --- BOTÃO DE ENVIO --- */}
          <div className="form-actions">
            <button type="submit" className="btn-submit-cadastro ">
              Cadastrar Usuário
            </button>
          </div>
        </form>
        {/* Fim do formulário */}
      </main>
      {/* ===== FIM DO CONTEÚDO DO MAIN ===== */}

      <Footer />
    </div>
  );
};

export default CadastroUser;
