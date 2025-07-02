import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    AllProjectsAndNestedCollectionsQuery,
    ListProjetsFieldsFragmentDoc,
    MotFieldsFragmentDoc,
    RubriquePresentationQuery,
} from '@graphql/__generated__/graphql';
import { ALL_PROJECTS_AND_NESTED_COLLECTIONS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';
import ProjectListWrapper from '@ui/components/projectListWrapper';

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

export default async function Projets() {
    const { data } = await query<AllProjectsAndNestedCollectionsQuery>({
        query: ALL_PROJECTS_AND_NESTED_COLLECTIONS,
        variables: {
            whereRubriques: [`id_parent=${process.env.SPIP_RUBRIQUE_PROJETS_ID}`],
            rubriquesOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
            whereMots: [`id_groupe=${process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID}`],
        },
    });

    const projectListFragment = getFragmentData(
        ListProjetsFieldsFragmentDoc,
        data?.rubriques?.result as FragmentType<typeof ListProjetsFieldsFragmentDoc>[]
    );

    const motsFragment = getFragmentData(
        MotFieldsFragmentDoc,
        data?.mots?.result as FragmentType<typeof MotFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation />

            <ProjectListWrapper projects={projectListFragment} politiquesPubliquesMots={motsFragment} />
        </div>
    );
}
