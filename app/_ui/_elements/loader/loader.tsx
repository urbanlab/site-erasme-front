import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.mainContainer}>
            <p className={styles.loadingText}>Recherche en cours</p>
            <div className={styles.loadingBar}>
                <div className={styles.loadingInnerBar}></div>
            </div>
        </div>
    );
}
