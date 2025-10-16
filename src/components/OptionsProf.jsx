const OptionsProf = ({ db }) => {
  const users = db.filter((user) => user.isTeacher === true);
  
  // Retorna diretamente o array de JSX, sem envolver em nada
  return users.map((user) => (
    <option key={user.id} value={user.id}>{user.nome}</option>
  ));
};

export default OptionsProf;