import Link from "next/link";
import React from "react";
import styles from "./LinkButton.module.scss";

export const LinkButton = ({ link, text }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button>
        <Link href={link}>{text}</Link>
      </button>
    </div>
  );
};
