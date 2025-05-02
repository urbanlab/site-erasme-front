import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';
import heroImage from '@public/hero-img.svg';

const pageTexts = {
    presentationSection: {
        title: 'PROJETS',
        description:
            'Vous trouverez ici les programmes et projets conduits par Erasme, avec ses partenaires, visant à la production de communs  : méthodologies, outils, usages. Accédez aux actualités, ressources et réflexions pour vous documenter, et participer.',
    },
};


export default function Projets() {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            {/* PRESENTATION SECTION */}
            <div className={styles.presentationContainer}>
                <ShapedImage src={heroImage} alt="" maskShape='narrow' className={styles.presentationImage} />
                <div className={styles.presentationTextContainer}>
                    <h1>{pageTexts.presentationSection.title}</h1>
                    <h5>{pageTexts.presentationSection.description}</h5>
                </div>
            </div>
        </div>

        
    );
}