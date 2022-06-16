import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./location.module.scss";

const Location = () => {
  const router = useRouter();

  const [location, setLocation] = useState({
    name: "",
    address: "",
    description: "",
    mapLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/location", location);
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setLocation({ ...location, [name]: value });
  };

  return (
    <div className={styles.formWrapper}>
      <form action="POST" onSubmit={handleSubmit}>
        <h1>Crear localización</h1>
        <p>Utiliza el siguiente formulario para crear un perfil de acogida</p>
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" onChange={handleChange} />
        <br />
        <label htmlFor="address">Dirección:</label>
        <input type="text" name="address" onChange={handleChange} />
        <br />
        <label htmlFor="description">Descripción:</label>
        <textarea
          type="text"
          rows="6"
          name="description"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="mapLink">Localización de Google Maps:</label>
        <input type="text" name="mapLink" onChange={handleChange} />
        <br />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default Location;
