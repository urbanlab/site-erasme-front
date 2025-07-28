import { getAllProjets, getGroupeMotsWithMots, getRubrique } from '@data/queries';
import ProjectListWrapper from '@ui/client-components/projectListWrapper';
import { RubriquePresentation } from './_ui/_components/components';
import styles from './page.module.css';

export default async function Projets() {
    const { rubrique } = await getRubrique(parseInt(process.env.SPIP_RUBRIQUE_PROJETS_ID ?? ''));

    const { projets } = await getAllProjets();

    const { groupeMotsWithMots: groupeMotsPolitiquesPubliques } = await getGroupeMotsWithMots(
        parseInt(process.env.SPIP_GROUPE_MOTS_POLITIQUES_PUBLIQUES_ID ?? '')
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation rubrique={rubrique} />

            <ProjectListWrapper projects={projets} groupeMotsForFilter={groupeMotsPolitiquesPubliques} />
        </div>
    );
}
