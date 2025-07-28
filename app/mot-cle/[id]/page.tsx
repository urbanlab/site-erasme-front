import { getAllProjets, getGroupeMotsWithMots, getMot } from '@data/queries';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import { MotsAndGroupeMotsFieldsFragmentDoc } from '@services/graphql/__generated__/graphql';
import ProjectListWrapper from '@ui/components/projectListWrapper';
import { MotClePresentation } from './_ui/_components/components';
import styles from './page.module.css';

/**
 * Pre-fetch during build time
 * Get all `mots` from the giving `groupe_mot`
 */
export async function generateStaticParams() {
    const { groupeMotsWithMots } = await getGroupeMotsWithMots(
        parseInt(process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '')
    );

    return groupeMotsWithMots.map(mot => {
        return { id: mot.id ?? '' };
    });
}

export default async function MotCleItem({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { mot } = await getMot(parseInt(id));

    const { groupeMotsWithMots } = await getGroupeMotsWithMots(
        parseInt(process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID ?? '')
    );
    const { projets } = await getAllProjets(true);

    const projetsFilteredWithMotCle = projets
        .map(projet => {
            const filteredArticles = projet?.articles?.result?.filter(article => {
                const motsFromArticleFragment = getFragmentData(
                    MotsAndGroupeMotsFieldsFragmentDoc,
                    article?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
                );

                return motsFromArticleFragment.some(mot => mot?.id === id);
            });

            if (filteredArticles?.length === 0) return null;

            return {
                ...projet,
                articles: {
                    ...projet.articles,
                    result: filteredArticles,
                },
            };
        })
        .filter(projet => projet !== null);

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <MotClePresentation keywordInformation={mot} />

            <ProjectListWrapper projects={projetsFilteredWithMotCle} groupeMotsForFilter={groupeMotsWithMots} />
        </div>
    );
}
