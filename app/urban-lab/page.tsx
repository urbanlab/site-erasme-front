import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ArticleFullInformationFieldsFragmentDoc,
    DocumentFullInformationFieldsFragment,
    DocumentFullInformationFieldsFragmentDoc,
    RubriqueBasicInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { DYNAMIC_PAGE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtml, RemoteHtmlRawText } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import Carousel from '@ui/elements/carousel';
import styles from './page.module.css';

const RubriquePresentation = ({ logo, title, description }: { logo: string; title: string; description?: string }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={logo ? logo : heroImage} alt="" maskShape="wide" className={styles.logo} />
            <h1 className={styles.title}>{title}</h1>
            {description && (
                <h5 className={styles.description}>
                    <RemoteHtmlRawText html={description} removeInnerHtmlTags={true} />
                </h5>
            )}
        </div>
    );
};

const ArticleSection = ({
    title,
    content,
    images,
    imagesOnTheLeft,
    className,
}: {
    title: string;
    content: string;
    images?: DocumentFullInformationFieldsFragment[];
    imagesOnTheLeft?: boolean;
    className?: string;
}) => {
    return (
        <div className={`${styles.articleContainer} ${imagesOnTheLeft ? styles.imagesOnTheLeft : ''} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            <RemoteHtml html={content ?? ''} className={styles.content} />
            {images && <Carousel images={images} className={styles.images} />}
        </div>
    );
};

export default async function UrbanLab() {
    const { data } = await getClient().query({
        query: DYNAMIC_PAGE,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUE_URBANLAB_ID ?? '') },
    });

    const rubrique = getFragmentData(
        RubriqueBasicInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueBasicInformationFieldsFragmentDoc>
    );

    const articles = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getRubrique?.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
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
