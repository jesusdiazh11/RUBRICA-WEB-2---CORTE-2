import React, { useState } from "react";

const Formulario = () => {
  const [cedula, SetCedula] = useState("");
  const [jugador, SetJugador] = useState("");
  const [nacionalidad, SetNacionalidad] = useState("");
  const [altura, SetAltura] = useState("");
  const [equipo, SetEquipo] = useState("");
  const [posicion, SetPosicion] = useState("");
  const [numero, SetNumero] = useState("");
  const [habilidad, SetHabilidad] = useState("");
  const [listaJugadores, setListaJugadores] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD WEB2 C2</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">JUGADORES DE LA NBA</h4>
          <ul className="list-group">{}</ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">Agregar Jugador NBA</h4>
          <form onSubmit="guardarJugador">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Cédula"
              value={cedula}
              onChange={(e) => SetCedula(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Jugador"
              value={jugador}
              onChange={(e) => SetJugador(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Nacionalidad"
              value={nacionalidad}
              onChange={(e) => SetNacionalidad(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Ingrese Altura del Jugador"
              value={altura}
              onChange={(e) => SetAltura(e.target.value)}
            />
            <select
              name="hola"
              type="text"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => SetEquipo(e.target.value)}
              defaultValue=""
            >
              <option value="">Seleccione un Equipo</option>
              <option value="Boston Celtics">Boston Celtics</option>
              <option value="Brooklyn Nets">Brooklyn Nets</option>
              <option value="Philadelphia 76ers">Philadelphia 76ers</option>
              <option value="Toronto Raptors">Toronto Raptors</option>
              <option value="Golden State Warriors">
                Golden State Warriors
              </option>
              <option value="LA Clippers">LA Clippers</option>
              <option value="Los Angeles Lakers">Los Angeles Lakers</option>
              <option value="Phoenix Suns">Phoenix Suns</option>
              <option value="Sacramento Kings">Sacramento Kings</option>
              <option value="Chicago Bulls">Chicago Bulls</option>
              <option value="Cleveland Cavaliers">Cleveland Cavaliers</option>
              <option value="Detroit Pistons">Detroit Pistons</option>
              <option value="Indiana Pacers">Indiana Pacers</option>
              <option value="Milwaukee Bucks">Milwaukee Bucks</option>
              <option value="Atlanta Hawks">Atlanta Hawks</option>
              <option value="Charlotte Hornets">Charlotte Hornets</option>
              <option value="Miami Heat">Miami Heat</option>
              <option value="Orlando Magic">Orlando Magic</option>
              <option value="Washington Wizards">Washington Wizards</option>
              <option value="Denver Nuggets">Denver Nuggets</option>
              <option
                value="
Minnesota Timberwolves"
              >
                Minnesota Timberwolves
              </option>
              <option value="Oklahoma City Thunder">
                Oklahoma City Thunder
              </option>
              <option value="Portland Trail Blazers">
                Portland Trail Blazers
              </option>
              <option value="Utah Jazz">Utah Jazz</option>
              <option value="Dallas Mavericks">Dallas Mavericks</option>
              <option value="Houston Rockets">Houston Rockets</option>
              <option value="Memphis Grizzlies">Memphis Grizzlies</option>
              <option value="New Orleans Pelicans">New Orleans Pelicans</option>
              <option value="San Antonio Spurs">San Antonio Spurs</option>
            </select>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese una Posición"
              value={posicion}
              onChange={(e) => SetPosicion(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Ingrese Numero de Camiseta"
              value={numero}
              onChange={(e) => SetNumero(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Habilidad"
              value={habilidad}
              onChange={(e) => SetHabilidad(e.target.value)}
            />
            <button className="btn btn-primary btn-block">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
