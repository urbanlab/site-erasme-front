import ShapedImage from '@ui/components/shapedImage';
import { ServicesSection } from './_ui/_components/components';
import styles from './page.module.css';
import { getRubriqueWithArticles } from '@data/queries';

export default async function Services() {
    const { rubriqueBasicInformation: rubrique, articlesFullInformation: articles } = await getRubriqueWithArticles(
        parseInt(process.env.SPIP_RUBRIQUE_SERVICES_ID ?? ''),
        false,
        true
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage className={styles.logo} alt="logo rubrique" maskShape="wide" src={rubrique.logo ?? ''} />

            <ServicesSection articles={articles} className={styles.servicesContainer} />
        </div>
    );
}
