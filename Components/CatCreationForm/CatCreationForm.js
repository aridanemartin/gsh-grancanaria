import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CatCreationForm.module.scss";

export default function CatCreationForm({ location, adopter }) {
  const [cat, setCat] = useState({
    name: "",
    description: "",
    age: "",
    vaccined: "",
    breed: "",
    gender: "",
    location_id: null,
    adopter_id: null,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/cats", cat);
    console.log(res);
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    if (value === "") {
      setCat({ ...cat, [name]: null });
    } else {
      setCat({ ...cat, [name]: value });
    }
  };

  console.log(cat);

  return (
    <div className={styles.formWrapper}>
      <form action="POST" onSubmit={handleSubmit}>
        <h2>Información del gato</h2>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={cat.name}
        />
        <br />
        <label htmlFor="description">Descripción:</label>
        <textarea
          name="description"
          rows="7"
          onChange={handleChange}
          value={cat.description}
        />
        <br />
        <label htmlFor="age">Edad:</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={cat.age}
        />
        <br />
        <label htmlFor="vaccined">Vacunado</label>
        <select id="vaccined" name="vaccined" onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
        <br />
        <label htmlFor="breed">Raza:</label>
        <input type="text" name="breed" onChange={handleChange} />
        <br />
        <label htmlFor="gender">Género:</label>
        <input type="text" name="gender" onChange={handleChange} />
        <br />
        <h2>Localización</h2>
        {location && (
          <>
            <label htmlFor="location_id">Elige una localización:</label>
            <select id="location_id" name="location_id" onChange={handleChange}>
              <option disabled selected value="">
                {" "}
                -- Selecciona una opción --{" "}
              </option>
              <option selected value="">
                {" "}
                -- Desconocida --{" "}
              </option>
              {location.map((location) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="adopter_id">Ha sido adoptado por:</label>
            <select id="adopter_id" name="adopter_id" onChange={handleChange}>
              <option disabled selected value="">
                {" "}
                -- Selecciona una opción --{" "}
              </option>
              <option value="">* Todavía no ha sido adoptado *</option>
              {adopter.map((adopter) => (
                <option key={adopter.adopter_id} value={adopter.adopter_id}>
                  {adopter.name}
                </option>
              ))}
            </select>
          </>
        )}

        <button>Save Cat</button>
      </form>
    </div>
  );
}
