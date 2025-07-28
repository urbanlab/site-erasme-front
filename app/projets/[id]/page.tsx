import { getRubriqueWithArticles } from '@data/queries';
import ArticleList from '@ui/components/articleList';
import { DescriptionSection, RubriquePresentation } from './_ui/_components/components';
import styles from './page.module.css';

/**
 * Do not generate pages other than the ones defined in `generateStaticParams`
 */
export const dynamicParams = false;

export async function generateStaticParams() {
    return [{ id: process.env.SPIP_RUBRIQUE_PROJETS_INCUBATION_ID }, { id: process.env.SPIP_RUBRIQUE_PROJETS_CCN_ID }];
}

export default async function Projet({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { rubrique: projet, articlesBasicInformation: articles } = await getRubriqueWithArticles(parseInt(id));

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation logo={projet.logo ?? ''} title={projet.titre ?? ''} />

            <DescriptionSection content={projet.texte ?? ''} />

            <ArticleList articles={articles} />
        </div>
    );
}
