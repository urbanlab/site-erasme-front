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
    const { presentationErasmeArticle, missionArticle, enCeMomentArticles, archiveArticleIdList, servicesArticles } =
        await getHomepage();

    //TODO: end implementation of the homepage
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <PresentationSection
                title={presentationErasmeArticle.titre ?? ''}
                description={presentationErasmeArticle.texte ?? ''}
                logo={presentationErasmeArticle.logo ?? ''}
            />

            <EnCeMomentSection articles={enCeMomentArticles} archiveArticleIdList={archiveArticleIdList} />

            <ProgrammesSection />

            <ServicesSection articles={servicesArticles} />

            <MissionsSection article={missionArticle} />
        </div>
    );
}
