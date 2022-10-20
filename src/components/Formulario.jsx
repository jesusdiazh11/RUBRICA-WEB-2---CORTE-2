import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";

const Formulario = () => {
  const [jugador, SetJugador] = useState("");
  const [nacionalidad, SetNacionalidad] = useState("");
  const [altura, SetAltura] = useState("");
  const [equipo, SetEquipo] = useState("");
  const [posicion, SetPosicion] = useState("");
  const [numero, SetNumero] = useState("");
  const [habilidad, SetHabilidad] = useState("");
  const [listaJugadores, setListaJugadores] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, SetId] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        await onSnapshot(collection(db, "jugadores"), (query) => {
          setListaJugadores(
            query.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "jugadores", id));
    } catch (error) {
      console.log(error);
    }
  };

  const guardarJugador = async (e) => {
    e.preventDefault();
    try {
      const data = await addDoc(collection(db, "jugadores"), {
        jugador: jugador,
        nacionalidad: nacionalidad,
        altura: altura,
        equipo: equipo,
        posicion: posicion,
        numero: numero,
        habilidad: habilidad,
      });
      setListaJugadores([
        ...listaJugadores,
        {
          jugador: jugador,
          nacionalidad: nacionalidad,
          altura: altura,
          equipo: equipo,
          posicion: posicion,
          numero: numero,
          habilidad: habilidad,
          id: data.id,
        },
      ]);

      SetJugador("");
      SetNacionalidad("");
      SetAltura("");
      SetEquipo("");
      SetPosicion("");
      SetNumero("");
      SetHabilidad("");
    } catch (error) {
      console.log(error);
    }
  };

  const editarJugador = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "jugadores", id);
      await updateDoc(docRef, {
        jugador: jugador,
        nacionalidad: nacionalidad,
        altura: altura,
        equipo: equipo,
        posicion: posicion,
        numero: numero,
        habilidad: habilidad,
      });

      const nuevoArray = listaJugadores.map((item) =>
        item.id === id
          ? {
              id: id,
              jugador: jugador,
              nacionalidad: nacionalidad,
              altura: altura,
              equipo: equipo,
              posicion: posicion,
              numero: numero,
              habilidad: habilidad,
            }
          : item
      );

      setListaJugadores(nuevoArray);
      SetJugador("");
      SetNacionalidad("");
      SetAltura("");
      SetEquipo("");
      SetPosicion("");
      SetNumero("");
      SetHabilidad("");
      SetId("")
      setModoEdicion(false)
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (item) => {
    SetJugador(item.jugador);
    SetNacionalidad(item.nacionalidad);
    SetAltura(item.altura);
    SetEquipo(item.equipo);
    SetPosicion(item.posicion);
    SetNumero(item.numero);
    SetHabilidad(item.habilidad);
    SetId(item.id);
    setModoEdicion(true);
  };

  const cancelar = () => {
    setModoEdicion(false);
    SetJugador("");
    SetNacionalidad("");
    SetAltura("");
    SetEquipo("");
    SetPosicion("");
    SetNumero("");
    SetHabilidad("");
    SetId("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD WEB2 C2</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">JUGADORES DE LA NBA</h4>
          <ul className="list-group">
            {listaJugadores.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">
                  {item.jugador}-{item.nacionalidad}-{item.altura}-{item.equipo}
                  -{item.posicion}-{item.numero}-{item.habilidad}
                </span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => editar(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Jugador" : "Agregar Jugador"}
          </h4>
          <form onSubmit={modoEdicion ? editarJugador : guardarJugador}>
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
              placeholder="Ingrese Altura"
              value={altura}
              onChange={(e) => SetAltura(e.target.value)}
            />
            <select
              type="text"
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={(e) => SetEquipo(e.target.value)}
              value={equipo}
            >
              <option value="">Seleccione Equipo</option>
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
            <select
              type="text"
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={(e) => SetPosicion(e.target.value)}
              value={posicion}
            >
              <option value="">Seleccione Posición</option>
              <option value="BASE">BASE</option>
              <option value="ESCOLTA">ESCOLTA</option>
              <option value="ALERO">ALERO</option>
              <option value="ALA-PIVOT">ALA-PIVOT</option>
              <option value="PIVOT">PIVOT</option>
            </select>

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Ingrese Número"
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
            {modoEdicion ? (
              <>
                <button className="btn btn-warning btn-block" on="submit">
                  Editar
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancelar()}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary btn-block">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
