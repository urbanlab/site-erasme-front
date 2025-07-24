import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    ArticleBasicInformationFieldsFragmentDoc,
    RubriqueBasicInformationFieldsFragment,
    RubriqueBasicInformationFieldsFragmentDoc,
    RubriqueFullInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { RUBRIQUE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtmlRawText } from '@services/remoteHtml';
import ArticleList from '@ui/components/articleList';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

const RubriquePresentation = ({
    rubriqueInformation,
}: {
    rubriqueInformation: RubriqueBasicInformationFieldsFragment;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={rubriqueInformation?.logo ?? heroImage}
                alt=""
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{rubriqueInformation?.titre}</h1>
            {rubriqueInformation?.texte && (
                <h5 className={styles.description}>
                    <RemoteHtmlRawText html={rubriqueInformation.texte} removeInnerHtmlTags={true} />
                </h5>
            )}
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
            <RubriquePresentation rubriqueInformation={rubriqueInformationFragment} />

            <ArticleList articles={articlesFromProjet} />
        </div>
    );
}
