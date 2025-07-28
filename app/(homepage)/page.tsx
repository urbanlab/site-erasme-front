import { getHomepage } from '@data/queries';
import {
    EnCeMomentSection,
    MissionsSection,
    PresentationSection,
    ProgrammesSection,
    ServicesSection,
} from './_ui/_components/components';
import styles from './page.module.css';

export default async function Home() {
    const { enCeMomentArticles, archiveArticleIdList, servicesArticles } = await getHomepage();

    //TODO: end implementation of the homepage
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <PresentationSection />

            <EnCeMomentSection articles={enCeMomentArticles} archiveArticleIdList={archiveArticleIdList} />

            <ProgrammesSection />

            <ServicesSection articles={servicesArticles} />

            <MissionsSection />
        </div>
    );
}
