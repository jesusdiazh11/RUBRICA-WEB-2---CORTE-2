import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import swal from "sweetalert";

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
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState(null);

  const obtenerImagen = async () => {
    const { url } = await fetch(`https://picsum.photos/200`);
    return url;
  };

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
    swal({
      title: "¿Seguro que deseas eliminar este jugador?",
      text: "¡El jugador será eliminado permanentemente!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          deleteDoc(doc(db, "jugadores", id));
          setModoEdicion(false);
        } catch (error) {
          console.log(error);
        }
        swal({
          title: "¡El jugador ha sido eliminado con éxito!",
          icon: "success",
          timer: 2000,
        });
      }
    });
  };

  const guardarJugador = async (e) => {
    e.preventDefault();
    if (jugador === "") {
      setError("Ingrese un nombre.");
    } else if (nacionalidad === "") {
      setError("Ingrese una nacionalidad.");
    } else if (altura === "") {
      setError("Ingrese una estatura.");
    } else if (equipo === "") {
      setError("Ingrese un equipo.");
    } else if (posicion === "") {
      setError("Ingrese una posición.");
    } else if (numero === "") {
      setError("Ingrese un número.");
    } else if (habilidad === "") {
      setError("Ingrese una habilidad.");
    } else {
      try {
        const url = await obtenerImagen();
        setImagen(url);
        const data = await addDoc(collection(db, "jugadores"), {
          imagen: url,
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
            imagen: url,
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
        setError(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editarJugador = async (e) => {
    e.preventDefault();
    if (jugador === "") {
      setError("Ingrese un nombre.");
    } else if (nacionalidad === "") {
      setError("Ingrese una nacionalidad.");
    } else if (altura === "") {
      setError("Ingrese una estatura.");
    } else if (equipo === "") {
      setError("Ingrese un equipo.");
    } else if (posicion === "") {
      setError("Ingrese una posición.");
    } else if (numero === "") {
      setError("Ingrese un número.");
    } else if (habilidad === "") {
      setError("Ingrese una habilidad.");
    } else {
      try {
        const url = await obtenerImagen();
        setImagen(url);
        const docRef = doc(db, "jugadores", id);
        await updateDoc(docRef, {
          imagen: url,
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
                imagen: url,
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
        SetId("");
        setModoEdicion(false);
        setError(null);
        swal({
            icon: "success",
            title: "Su jugador ha sido editado con éxito.",
            timer: 3000,
          });
      } catch (error) {
        console.log(error);
      }
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
      <h1 className="text-center">BASE DE DATOS DE LA NBA</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listado de Jugadores</h4>
          <ul className="list-group">
            {listaJugadores.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">
                  {item.jugador}-{item.nacionalidad}-{item.altura + "cm"}-
                  {item.equipo}-{item.posicion}-{item.numero}-{item.habilidad}
                </span>
                <div className="d-flex flex-column align-items-center">
                  <img
                    className="mb-2"
                    width={100}
                    src={item.imagen}
                    alt="imagenAleatoria"
                  />
                  <button
                    className="btn btn-danger btn-sm float-end mx-2 mb-2 col-2"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end col-2"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Jugador" : "Agregar Jugador"}
          </h4>
          <form onSubmit={modoEdicion ? editarJugador : guardarJugador}>
            {error ? (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            ) : null}
            <input
              type="name"
              className="form-control mb-2"
              placeholder="Ingrese Jugador"
              value={jugador}
              onChange={(e) => SetJugador(e.target.value)}
              //   required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Nacionalidad"
              value={nacionalidad}
              onChange={(e) => SetNacionalidad(e.target.value)}
              //   required
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Ingrese Altura(cm)"
              value={altura}
              onChange={(e) => SetAltura(e.target.value)}
              //   required
            />
            <select
              type="text"
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={(e) => SetEquipo(e.target.value)}
              value={equipo}
              //   required
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
              //   required
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
              //   required
            />
            <select
              type="text"
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={(e) => SetHabilidad(e.target.value)}
              value={habilidad}
              //   required
            >
              <option value="">Seleccione Habilidad</option>
              <option value="DESPLAZAMIENTO CON BALÓN">
                DESPLAZAMIENTO CON BALÓN
              </option>
              <option value="DESPLAZAMIENTO SIN BALÓN">
                DESPLAZAMIENTO SIN BALÓN
              </option>
              <option value="LUCHA">LUCHA</option>
              <option value="DEFENSA">DEFENSA</option>
              <option value="SALTO">SALTO</option>
              <option value="TIRO CERCANO">TIRO CERCANO</option>
              <option value="TIRO LEJANO">TIRO LEJANO</option>
              <option value="MATE">MATE</option>
              <option value="BANDEJA">BANDEJA</option>
              <option value="REBOTES">REBOTES</option>
            </select>
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
