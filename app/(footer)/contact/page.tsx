import { getArticle, getRubrique } from '@data/queries';
import ShapedImage from '@ui/components/shapedImage';
import { AddessesWrapper } from './_ui/_client-components/client-components';
import { ArticleSection } from './_ui/_components/components';
import styles from './page.module.css';
import contactIcon from '@public/contact-icon.svg';
import Image from 'next/image';

export default async function Contact() {
    const { rubriqueBasicInformation: rubrique } = await getRubrique(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ID ?? '')
    );
    const { article: articleNousJoindre } = await getArticle(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_NOUS_JOINDRE_ID ?? '')
    );
    const { article: articleBureauxAdministratifs } = await getArticle(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_BUREAUX_ADMINISTRATIFS_ID ?? '')
    );
    const { article: articleUrbanLab } = await getArticle(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_URBAN_LAB_ID ?? '')
    );
    const { article: articleLaClasse } = await getArticle(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_LACLASSE_ID ?? '')
    );
    const { article: articleReseauxSociaux } = await getArticle(
        parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_RESEAUX_SOCIAUX_ID ?? '')
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage className={styles.logo} alt="logo rubrique" maskShape="wide" src={rubrique.logo ?? ''} />

            <div className={styles.contentContainer}>
                <ArticleSection article={articleNousJoindre} className={{ container: styles.nousRejoindre }} />

                <Image src={contactIcon} alt="" className={`${styles.icon} ${styles.desktopOnly}`} />

                <AddessesWrapper
                    bureauxAdministratifsSection={<ArticleSection article={articleBureauxAdministratifs} />}
                    urbanLabSection={<ArticleSection article={articleUrbanLab} />}
                    className={styles.wrapper}
                />

                <ArticleSection article={articleLaClasse} className={{ container: styles.laclasse }} />

                <ArticleSection article={articleReseauxSociaux} className={{ container: styles.reseauxSociaux }} />
            </div>
        </div>
    );
}
