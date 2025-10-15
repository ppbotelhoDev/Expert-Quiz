const Gabarito = (props) => {
    return(
         <div className="opcao-gab">
            <h3>{props.alt} - </h3>
            <select className="select-gab" name="">
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
            </select>
         </div>
    )
}

export default Gabarito;