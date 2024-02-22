import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://www.instagram.com/fatemehbazgir.js?igsh=M2tkcXcwYWhnd2R2">
            FatemehBazgir.js
          </a>{" "}
          | React.js
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Fatemeh with 💖</p>
      </footer>
    </>
  );
}

export default Layout;
