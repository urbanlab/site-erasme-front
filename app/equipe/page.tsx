import { getActiveAuteurs, getGroupeMotsWithMots, getRubrique } from '@data/queries';
import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import { CollaborateursSection, PartenairesSection } from './_ui/_components/components';
import styles from './page.module.css';

export default async function Equipe() {
    const { rubrique } = await getRubrique(parseInt(process.env.SPIP_RUBRIQUE_EQUIPE_ID ?? ''));

    const { groupeMotsWithMots } = await getGroupeMotsWithMots(
        parseInt(process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '')
    );

    const { activeAuteurs } = await getActiveAuteurs();

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage className={styles.logo} alt="logo page" maskShape="wide" src={rubrique?.logo ?? ''} />

            {rubrique?.texte && <RemoteHtml html={rubrique?.texte} className={styles.description} />}

            <CollaborateursSection activeAuteurs={activeAuteurs} className={styles.team} />
            <PartenairesSection partenaires={groupeMotsWithMots} className={styles.partners} />
        </div>
    );
}
