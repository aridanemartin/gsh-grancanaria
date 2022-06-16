import axios from "axios";
import { useRouter } from "next/router";
import styles from "./id.module.scss";

export default function Cat({ cat, location, adopter }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await axios.delete("/api/cats/" + id);
    router.push("/");
  };

  console.log(location);
  console.log(cat);
  console.log(adopter);

  return (
    <>
      <div className={styles.detailWrapper}>
        <div className={styles.detail}>
          <h1>{cat.name}</h1>
          <p className={styles.label}>Descripción:</p>
          <p>{cat.description}</p>
          <p className={styles.label}>Edad:</p>
          <p>{cat.age} años</p>
          <p className={styles.label}>Vacunado:</p>
          {cat.vaccined ? <p>Sí</p> : <p>No</p>}
          <p className={styles.label}>Raza:</p>
          <p>{cat.breed}</p>
          <p className={styles.label}>Localización:</p>
          <p>{location.name}</p>
          <p>{location.address}</p>
          {cat.adopter_id ? (
            <div className={styles.adopter}>
              <p className={styles.label}>Adoptado por:</p>
              <p>{adopter.name}</p>
            </div>
          ) : (
            <p className={styles.label + " " + styles.danger}>
              Posibilidad de adopción
            </p>
          )}
          <div className={styles.buttons}>
            <button onClick={() => router.push("/cats/edit/" + cat.cat_id)}>
              Editar
            </button>
            <button onClick={() => handleDelete(cat.cat_id)}>Borrar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data: cat } = await axios.get(
    "http://localhost:3000/api/cats/" + context.query.id
  );

  const { data: location } = await axios.get(
    "http://localhost:3000/api/location/" + cat.location_id
  );

  const { data: adopter } = await axios.get(
    "http://localhost:3000/api/adopter/" + cat.adopter_id
  );

  return {
    props: {
      cat,
      location,
      adopter,
    },
  };
};
