import { ListProjetsQuery, RubriquePresentationQuery } from '@graphql/__generated__/graphql';
import { LIST_PROJETS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import styles from './page.module.css';

const RubriquePresentation = async () => {
    const { data } = await query<RubriquePresentationQuery>({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUES_PROJETS_ID ?? '') },
    });

    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={data.getRubrique?.logo ?? heroImage}
                alt=""
                maskShape="narrow"
                className={styles.presentationImage}
            />
            <div className={styles.presentationTextContainer}>
                <h1>{data?.getRubrique?.titre}</h1>
                <Tag value="Projet" />
                {data?.getRubrique?.texte && (
                    <h5>
                        <RemoteHtml html={data.getRubrique.texte} />
                    </h5>
                )}
            </div>
        </div>
    );
};

const ProjetsList = async () => {
    const { data } = await query<ListProjetsQuery>({
        query: LIST_PROJETS,
        variables: { where: `id_parent=${process.env.SPIP_RUBRIQUES_PROJETS_ID}` },
    });

    return <RubriqueProjetsAccordion rubriques={data.rubriques} />;
};

export default async function Projets() {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation />

            <ProjetsList />
        </div>
    );
}
