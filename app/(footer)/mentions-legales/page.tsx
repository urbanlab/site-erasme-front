import { getArticle } from '@data/queries';
import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

export default async function MentionsLegales() {
    const { article } = await getArticle(parseInt(process.env.SPIP_ARTICLE_MENTIONS_LEGALES_ID ?? ''));

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage className={styles.logo} alt="logo rubrique" maskShape="wide" src={article.logo ?? ''} />
            <h1 className={styles.title}>{article.titre}</h1>
            {article.texte && <RemoteHtml html={article.texte} className={styles.content} />}
        </div>
    );
}
