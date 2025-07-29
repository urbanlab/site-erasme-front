import { getRubriqueWithArticles } from '@data/queries';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__';
import { DocumentFullInformationFieldsFragmentDoc } from '@services/graphql/__generated__/graphql';
import ArticleListWrapper from '@ui/client-components/articleListWrapper';
import Carousel from '@ui/client-components/carousel';
import { ChiffresCles } from '@ui/components/chiffresCles';
import { Timeline } from '@ui/components/timeline';
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

    const { rubriqueFullInformation: projet, articlesBasicInformation: articles } = await getRubriqueWithArticles(
        parseInt(id),
        true,
        false
    );

    const imagesFromProjet = getFragmentData(
        DocumentFullInformationFieldsFragmentDoc,
        projet.documents?.result as FragmentType<typeof DocumentFullInformationFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation logo={projet.logo ?? ''} title={projet.titre ?? ''} />

            <DescriptionSection content={projet.texte ?? ''} />

            {projet.titre_section_supplementaire_1 && projet.texte_section_supplementaire_1 && (
                <DescriptionSection
                    title={projet.titre_section_supplementaire_1 ?? ''}
                    content={projet.texte_section_supplementaire_1 ?? ''}
                />
            )}

            <ArticleListWrapper articles={articles} />

            {projet.titre_section_supplementaire_2 && projet.texte_section_supplementaire_2 && (
                <DescriptionSection
                    title={projet.titre_section_supplementaire_2 ?? ''}
                    content={projet.texte_section_supplementaire_2 ?? ''}
                />
            )}

            {(projet.texte_section_stades_dev || imagesFromProjet) && imagesFromProjet.length > 0 && (
                <div className={styles.sectionsWrapper}>
                    <div className={styles.stadesDevContainer}>
                        <DescriptionSection
                            title={projet.titre_section_stades_dev ?? ''}
                            content={projet.texte_section_stades_dev ?? ''}
                        />
                        {projet.data_section_stades_dev && <Timeline timeline={projet.data_section_stades_dev} />}
                    </div>

                    {imagesFromProjet && imagesFromProjet.length > 0 && (
                        <Carousel images={imagesFromProjet} className={styles.carousel} />
                    )}
                </div>
            )}

            {projet.texte_section_chiffres_cles && (
                <ChiffresCles
                    title={projet.titre_section_chiffres_cles ?? ''}
                    chiffresCles={projet.texte_section_chiffres_cles ?? ''}
                    splitBy=":"
                    className={styles.chiffresClesContainer}
                />
            )}
        </div>
    );
}
