import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    AuteurFullInformationFieldsFragment,
    AuteurFullInformationFieldsFragmentDoc,
    ListProjetsFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { ACTIVE_AUTHORS, ALL_PROJECTS_AND_NESTED_COLLECTIONS } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtmlRawText } from '@services/remoteHtml';
import ProjectListWrapper from '@ui/components/projectListWrapper';
import ShapedImage from '@ui/components/shapedImage';
import Link from 'next/link';
import styles from './page.module.css';

// Pre-fetch during build time
export async function generateStaticParams() {
    const { data } = await getClient().query({
        query: ACTIVE_AUTHORS,
        variables: { idRubriqueEquipe: parseInt(process.env.SPIP_RUBRIQUE_EQUIPE_ID ?? '') },
    });

    // Assuming that each article from 'Equipe' has only 1 author
    const activeAuthors =
        data.getRubrique?.articles?.result?.map(article => {
            return { id: article?.auteurs?.result?.at(0)?.id ?? '' };
        }) ?? [];

    return activeAuthors;
}

const AuthorPresentation = async ({
    authorInformation,
}: {
    authorInformation: AuteurFullInformationFieldsFragment;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={authorInformation.logo ?? heroImage}
                alt="photo de l'auteur"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{authorInformation.titre}</h1>
            <RemoteHtmlRawText
                html={authorInformation.descriptif ?? ''}
                className={`${styles.tag} ${styles.tagStyle} `}
            />
            <p className={styles.email}>{authorInformation.email ?? ''}</p>
            <ul className={styles.socialMedia}>
                {authorInformation.auteur_compte_linkedin && (
                    <li>
                        <Link
                            href={authorInformation.auteur_compte_linkedin}
                            target="_blank"
                            className={styles.linkStyle}
                        >
                            LinkedIn
                        </Link>
                    </li>
                )}
                {authorInformation.auteur_compte_twitter && (
                    <li>
                        <Link
                            href={authorInformation.auteur_compte_twitter}
                            target="_blank"
                            className={styles.linkStyle}
                        >
                            Twitter
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default async function Author({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await getClient().query({
        query: ALL_PROJECTS_AND_NESTED_COLLECTIONS,
        variables: {
            whereRubriques: [`id_parent=${process.env.SPIP_RUBRIQUE_PROJETS_ID}`],
            rubriquesOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
            idGroupeMotsForFilter: parseInt(process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID ?? ''),
            withAuteurs: true,
            whereAuteurs: [`id_auteur=${id}`],
            idAuteur: parseInt(id ?? ''),
        },
    });

    const projectListFragment = getFragmentData(
        ListProjetsFieldsFragmentDoc,
        data?.rubriques?.result as FragmentType<typeof ListProjetsFieldsFragmentDoc>[]
    );

    const projectListFromAuthor = projectListFragment
        .map(rubrique => {
            const filteredArticles = rubrique?.articles?.result?.filter(
                article => (article?.auteurs?.result?.length ?? 0) > 0
            );

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

    const auteurInformationFragment = getFragmentData(
        AuteurFullInformationFieldsFragmentDoc,
        data?.getAuteur as FragmentType<typeof AuteurFullInformationFieldsFragmentDoc>
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <AuthorPresentation authorInformation={auteurInformationFragment} />

            <ProjectListWrapper projects={projectListFromAuthor} groupeMotsForFilter={motsAndGroupeMotsFragment} />
        </div>
    );
}
