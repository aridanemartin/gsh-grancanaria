import styles from "./ToggleButton.module.scss";

export const ToggleButton = ({ onClick, adoptedView }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={onClick}>
        {adoptedView ? "Ver gatos en adopción" : "Ver gatos adoptados"}
      </button>
    </div>
  );
};
