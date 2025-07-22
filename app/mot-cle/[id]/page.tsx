import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ListProjetsFieldsFragmentDoc,
    MotBasicInformationFieldsFragment,
    MotBasicInformationFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { ALL_PROJECTS_AND_NESTED_COLLECTIONS, MOTS_FROM_GROUPE_MOTS } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import ProjectListWrapper from '@ui/components/projectListWrapper';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

/**
 * Pre-fetch during build time
 * Get all `mots` from the giving `groupe_mot`
 */
export async function generateStaticParams() {
    const { data } = await getClient().query({
        query: MOTS_FROM_GROUPE_MOTS,
        variables: { idGroupeMots: parseInt(process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '') },
    });

    const motFragment = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data.getGroupe_mots?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    return motFragment.map(mot => {
        return { id: mot.id ?? '' };
    });
}

const KeywordPresentation = async ({
    keywordInformation,
}: {
    keywordInformation: MotBasicInformationFieldsFragment;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={keywordInformation.logo ?? heroImage}
                alt="photo du partenaire"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{keywordInformation.titre}</h1>
        </div>
    );
};

export default async function Keyword({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await getClient().query({
        query: ALL_PROJECTS_AND_NESTED_COLLECTIONS,
        variables: {
            whereRubriques: [`id_parent=${process.env.SPIP_RUBRIQUE_PROJETS_ID}`],
            rubriquesOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
            idGroupeMotsForFilter: parseInt(process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID ?? ''),
            withPartenaires: true,
            idPartenaire: parseInt(id ?? ''),
        },
    });

    const projectListFragment = getFragmentData(
        ListProjetsFieldsFragmentDoc,
        data?.rubriques?.result as FragmentType<typeof ListProjetsFieldsFragmentDoc>[]
    );

    const projectListFilteredWithKeyword = projectListFragment
        .map(rubrique => {
            const filteredArticles = rubrique?.articles?.result?.filter(article => {
                const motsFromArticleFragment = getFragmentData(
                    MotsAndGroupeMotsFieldsFragmentDoc,
                    article?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
                );

                return motsFromArticleFragment.some(mot => mot?.id === id);
            });

            if (filteredArticles?.length === 0) return null;

            return {
                ...rubrique,
                articles: {
                    ...rubrique.articles,
                    result: filteredArticles,
                },
            };
        })
        .filter(rubrique => rubrique !== null);

    const motsAndGroupeMotsFragment = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data?.getGroupe_mots?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    const motInformationFragment = getFragmentData(
        MotBasicInformationFieldsFragmentDoc,
        data?.getMot as FragmentType<typeof MotBasicInformationFieldsFragmentDoc>
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <KeywordPresentation keywordInformation={motInformationFragment} />

            <ProjectListWrapper projects={projectListFilteredWithKeyword} groupeMotsForFilter={motsAndGroupeMotsFragment} />
        </div>
    );
}
