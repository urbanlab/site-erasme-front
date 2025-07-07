import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import { ListProjetsFieldsFragmentDoc, MotsAndGroupeMotsFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { ALL_PROJECTS_AND_NESTED_COLLECTIONS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ProjectListWrapper from '@ui/components/projectListWrapper';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

const RubriquePresentation = async () => {
    const { data } = await getClient().query({
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
    const { data } = await getClient().query({
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
        MotsAndGroupeMotsFieldsFragmentDoc,
        data?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation />

            <ProjectListWrapper projects={projectListFragment} politiquesPubliquesMots={motsFragment} />
        </div>
    );
}
