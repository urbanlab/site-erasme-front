import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    ArticleBasicInformationFieldsFragmentDoc,
    RubriqueBasicInformationFieldsFragmentDoc,
    RubriqueFullInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { RUBRIQUE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtml } from '@services/remoteHtml';
import ArticleList from '@ui/components/articleList';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

/**
 * Do not generate pages other than the ones defined in `generateStaticParams`
 */
export const dynamicParams = false;

export async function generateStaticParams() {
    return [{ id: process.env.SPIP_RUBRIQUE_PROJETS_INCUBATION_ID }, { id: process.env.SPIP_RUBRIQUE_PROJETS_CCN_ID }];
}

const RubriquePresentation = ({ logo, title }: { logo: string; title: string }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={logo ?? heroImage} alt="" maskShape="wide" className={styles.logo} />
            <h1 className={styles.title}>{title}</h1>
        </div>
    );
};

const DescriptionSection = ({ content, title }: { content: string; title?: string }) => {
    return (
        <div>
            {title && <h2>{title}</h2>}
            <RemoteHtml html={content} />
        </div>
    );
};

export default async function Projet({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await getClient().query({
        query: RUBRIQUE,
        variables: { id: parseInt(id) },
    });

    const rubriqueFullInformationFragment = getFragmentData(
        RubriqueFullInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueFullInformationFieldsFragmentDoc>
    );

    const rubriqueInformationFragment = getFragmentData(
        RubriqueBasicInformationFieldsFragmentDoc,
        rubriqueFullInformationFragment as FragmentType<typeof RubriqueBasicInformationFieldsFragmentDoc>
    );

    const articlesFromProjet = getFragmentData(
        ArticleBasicInformationFieldsFragmentDoc,
        rubriqueFullInformationFragment.articles?.result as FragmentType<
            typeof ArticleBasicInformationFieldsFragmentDoc
        >[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation
                logo={rubriqueInformationFragment.logo ?? ''}
                title={rubriqueInformationFragment.titre ?? ''}
            />

            <DescriptionSection content={rubriqueInformationFragment.texte ?? ''} />

            <ArticleList articles={articlesFromProjet} />
        </div>
    );
}
