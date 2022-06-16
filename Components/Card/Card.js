import styles from "./Card.module.scss";
import catPaw from "../../assets/paws.png";
import Image from "next/image";

export const Card = ({ title, description }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>
        <div className={styles.imageContainer}>
          <Image src={catPaw} objectFit="cover" layout="fill" />
        </div>
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
    </div>
  );
};
