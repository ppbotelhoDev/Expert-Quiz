const CardMethrics = ({title, dataValue}) => {
  return (
    <div className="methrics">
      <div className="methrics-Title">
        <h3>{title}</h3>
      </div>
      <div className="methrics-Value">
        <h1>{dataValue}</h1>
      </div>
    </div>
  );
};

export default CardMethrics;
