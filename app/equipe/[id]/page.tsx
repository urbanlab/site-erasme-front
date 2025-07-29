import { getActiveAuteurs, getAllProjets, getAuteur, getGroupeMotsWithMots } from '@data/queries';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import { AuteurFullInformationFieldsFragmentDoc } from '@services/graphql/__generated__/graphql';
import ProjectListWrapper from '@ui/client-components/projectListWrapper';
import { notFound } from 'next/navigation';
import { AuteurPresentation } from './_ui/_components/components';
import styles from './page.module.css';

// Pre-fetch during build time
export async function generateStaticParams() {
    const { activeAuteurs } = await getActiveAuteurs();

    return activeAuteurs.map(auteur => {
        return { id: auteur.id };
    });
}

export default async function Auteur({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const { auteur } = await getAuteur(parseInt(id));

        const { projets } = await getAllProjets(true);

        const { groupeMotsWithMots } = await getGroupeMotsWithMots(
            parseInt(process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID ?? '')
        );

        const projetsFromAuteur = projets
            .map(projet => {
                const filteredArticles = projet?.articles?.result?.filter(article => {
                    const auteurs = getFragmentData(
                        AuteurFullInformationFieldsFragmentDoc,
                        article?.auteurs?.result as FragmentType<typeof AuteurFullInformationFieldsFragmentDoc>[]
                    );

                    return auteurs.some(auteur => auteur.id === id);
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
                <AuteurPresentation auteur={auteur} />

                <ProjectListWrapper projects={projetsFromAuteur} groupeMotsForFilter={groupeMotsWithMots} />
            </div>
        );
    } catch (error) {
        notFound();
    }
}
