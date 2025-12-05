import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.home}>
      <h1 className={styles.title}>Welcome to NoteHub</h1>
      <p className={styles.text}>Manage your notes easily.</p>
    </main>
  );
}
