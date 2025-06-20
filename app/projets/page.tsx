import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ListProjetsFieldsFragmentDoc,
    ListProjetsQuery,
    RubriquePresentationQuery,
} from '@graphql/__generated__/graphql';
import { LIST_PROJETS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

const RubriquePresentation = async () => {
    const { data } = await query<RubriquePresentationQuery>({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUE_PROJETS_ID ?? '') },
    });

    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={data.getRubrique?.logo ?? heroImage} alt="" maskShape="narrow" className={styles.logo} />
            <h1 className={styles.title}>{data?.getRubrique?.titre}</h1>
            {data?.getRubrique?.texte && (
                <h5 className={styles.description}>
                    <RemoteHtml html={data.getRubrique.texte} />
                </h5>
            )}
        </div>
    );
};

const ProjetsList = async () => {
    const { data } = await query<ListProjetsQuery>({
        query: LIST_PROJETS,
        variables: { where: `id_parent=${process.env.SPIP_RUBRIQUE_PROJETS_ID}` },
    });

    const rubriquesFragment = getFragmentData(
        ListProjetsFieldsFragmentDoc,
        data?.rubriques?.result as FragmentType<typeof ListProjetsFieldsFragmentDoc>[]
    );

    return <RubriqueProjetsAccordion projets={rubriquesFragment} />;
};

export default async function Projets() {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation />

            <ProjetsList />
        </div>
    );
}
