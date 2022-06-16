import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../Components/Card/Card";
import { LinkButton } from "../Components/LinkButton/LinkButton";
import { ToggleButton } from "../Components/ToggleButton/ToggleButton";
import styles from "../styles/Home.module.scss";

export default function Home({ cats }) {
  const [displayedCats, setDisplayedCats] = useState([]);
  const [adoptedView, setAdoptedView] = useState(true);

  useEffect(() => {
    const unadoptedCats = cats.filter((cat) => !cat.adopter_id);
    const adoptedCats = cats.filter((cat) => cat.adopter_id);
    {
      adoptedView
        ? setDisplayedCats(adoptedCats)
        : setDisplayedCats(unadoptedCats);
    }
  }, [cats, adoptedView]);

  return (
    <>
      <div className={styles.header}>
        <h1>Listado de animales {adoptedView ? "adoptados" : "en adopción"}</h1>
        <p>
          Haz click en cualquiera de las tarjetas para acceder a la descripción
          detallada del animal.
        </p>
      </div>

      <div className={styles.list}>
        <div className={styles.nav}>
          <ToggleButton
            onClick={() => setAdoptedView(!adoptedView)}
            adoptedView={adoptedView}
          />
          <Link href="/create-adopter">Nueva Casa de Acogida</Link>
          <Link href="/location">Nueva Localización</Link>
          {/* <Link text="Nueva Localización" link="/location" /> */}
        </div>

        {displayedCats.map((cat) => (
          <Link key={cat.cat_id} href={`/cats/${cat.cat_id}`}>
            <a>
              <Card title={cat.name} description={cat.description} />
            </a>
          </Link>
        ))}
      </div>
      <LinkButton text="Añadir nuevo animal" link="/create-cat" />
      <footer className={styles.footer}>
        <p>
          Trabajo realizado para la asignatura de Proyecto de Desarrollo de
          Aplicaciones Web
        </p>
      </footer>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/cats");
  const cats = (await res.json()) || [];

  return {
    props: { cats },
  };
};
