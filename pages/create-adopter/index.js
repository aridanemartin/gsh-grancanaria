import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./create-adopter.module.scss";

const CreateAdopter = () => {
  const router = useRouter();

  const [adopter, setAdopter] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/adopter", adopter);
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setAdopter({ ...adopter, [name]: value });
  };

  return (
    <div className={styles.formWrapper}>
      <form action="POST" onSubmit={handleSubmit}>
        <h1>Crear perfil de acogida</h1>
        <p>Utiliza el siguiente formulario para crear un perfil de acogida</p>
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" onChange={handleChange} />
        <br />
        <label htmlFor="address">Dirección:</label>
        <input type="text" name="address" onChange={handleChange} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={handleChange} />
        <br />
        <label htmlFor="phone">Teléfono:</label>
        <input type="text" name="phone" onChange={handleChange} />
        <br />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default CreateAdopter;
