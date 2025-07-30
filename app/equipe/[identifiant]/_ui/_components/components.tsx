import ShapedImage from '@ui/components/shapedImage';
import styles from './components.module.css';
import { AuteurFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import { RemoteHtmlRawText } from '@services/remoteHtml';
import Link from 'next/link';

const AuteurPresentation = async ({ auteur }: { auteur: AuteurFullInformationFieldsFragment }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={auteur.logo ?? ''} alt="photo de l'auteur" maskShape="wide" className={styles.logo} />

            <h1 className={styles.title}>{auteur.titre}</h1>

            {auteur.descriptif && (
                <RemoteHtmlRawText html={auteur.descriptif} className={`${styles.tag} ${styles.tagStyle} `} />
            )}

            <ul className={styles.socialMedia}>
                {auteur.auteur_compte_linkedin && (
                    <li>
                        <Link href={auteur.auteur_compte_linkedin} target="_blank" className={styles.linkStyle}>
                            LinkedIn
                        </Link>
                    </li>
                )}
                {auteur.auteur_compte_twitter && (
                    <li>
                        <Link href={auteur.auteur_compte_twitter} target="_blank" className={styles.linkStyle}>
                            Twitter
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export { AuteurPresentation };
