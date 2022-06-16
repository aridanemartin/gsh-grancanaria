import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./edit.module.scss";

export default function Edit({ location, adopter }) {
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
    await axios.put("/api/cats/" + router.query.id, cat);
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    if (value === "") {
      setCat({ ...cat, [name]: null });
    } else {
      setCat({ ...cat, [name]: value });
    }
  };

  useEffect(() => {
    const getCatWithId = async () => {
      const { data } = await axios.get("/api/cats/" + router.query.id);
      console.log(data);
      setCat(data);
    };
    getCatWithId(router.query.id);
  }, []);

  return (
    <div className={styles.formWrapper}>
      <form action="POST" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={cat.name}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          rows="3"
          onChange={handleChange}
          value={cat.description}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={cat.age}
        />
        <br />
        <label htmlFor="vaccined">Vaccined</label>
        <select id="vaccined" name="vaccined" onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
        <br />
        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          name="breed"
          onChange={handleChange}
          value={cat.breed}
        />
        <br />
        <label htmlFor="gender">Género:</label>
        <input
          type="text"
          name="gender"
          onChange={handleChange}
          value={cat.gender}
        />
        <br />
        {location && (
          <>
            <label htmlFor="location_id">Elige una localización:</label>
            <select
              id="location_id"
              name="location_id"
              onChange={handleChange}
              value={cat.location_id}
            >
              <option disabled selected value>
                {" "}
                -- Selecciona una opción --{" "}
              </option>
              {location.map((location) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="adopter_id">Ha sido adoptado por:</label>
            <select
              id="adopter_id"
              name="adopter_id"
              onChange={handleChange}
              value={cat.adopter_id}
            >
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

export const getServerSideProps = async () => {
  const res2 = await fetch("http://localhost:3000/api/location");
  const location = (await res2.json()) || [];

  const res3 = await fetch("http://localhost:3000/api/adopter");
  const adopter = (await res3.json()) || [];

  return {
    props: {
      location,
      adopter,
    },
  };
};
