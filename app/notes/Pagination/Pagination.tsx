import styles from './Pagination.module.css';

export default function Pagination() {
  return (
    <div className={styles.pagination}>
      <button className={styles.btn}>Prev</button>
      <span className={styles.page}>1</span>
      <button className={styles.btn}>Next</button>
    </div>
  );
}
