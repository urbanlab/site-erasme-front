import notFoundImage from '@public/not-found.png';
import ShapedImage from '@ui/components/shapedImage';
import Button from '@ui/elements/button';
import Link from 'next/link';
import styles from 'not-found.module.css';

export default function NotFound() {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
                <ShapedImage src={notFoundImage.src} alt="" maskShape="narrow" className={styles.logo} />
                <h1 className={styles.title}>Erreur 404</h1>
                <h5 className={styles.description}>
                    Oups, nous n’avons pas encore produit le contenu que vous recherchez...
                </h5>
                <Button className={styles.button} variant="ghost">
                    <Link href="/"> Accueil</Link>
                </Button>
        </div>
    );
}
