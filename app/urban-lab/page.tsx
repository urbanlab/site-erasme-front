import { getRubriqueWithArticles } from '@data/queries';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import { DocumentFullInformationFieldsFragmentDoc } from '@services/graphql/__generated__/graphql';
import { ArticleSection, RubriquePresentation } from './_ui/_components/components';
import styles from './page.module.css';

export default async function UrbanLab() {
    const { rubrique, articlesFullInformation: articles } = await getRubriqueWithArticles(
        parseInt(process.env.SPIP_RUBRIQUE_URBANLAB_ID ?? ''),
        true
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation
                title={rubrique.titre ?? ''}
                logo={rubrique.logo ?? ''}
                description={rubrique.texte ?? ''}
            />

            {articles.map((article, index) => {
                const imagesFromArticle = getFragmentData(
                    DocumentFullInformationFieldsFragmentDoc,
                    article.documents?.result as FragmentType<typeof DocumentFullInformationFieldsFragmentDoc>[]
                );

                return (
                    <ArticleSection
                        key={article.id}
                        title={article.titre ?? ''}
                        content={article.texte ?? ''}
                        images={imagesFromArticle}
                        imagesOnTheLeft={index % 2 !== 0}
                    />
                );
            })}
        </div>
    );
}
