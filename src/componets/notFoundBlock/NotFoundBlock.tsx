import styles from "./notFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.textCenter}>
      <span>😕</span>
      Ничего не найдено
    </h1>
  );
};

export default NotFoundBlock;
