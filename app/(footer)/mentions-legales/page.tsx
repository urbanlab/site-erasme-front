import { MENTIONS_LEGALES } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

export default async function MentionsLegales() {
    const { data } = await query({
        query: MENTIONS_LEGALES,
        variables: { id: parseInt(process.env.SPIP_PAGE_MENTIONS_LEGALES_ID ?? '') },
    });

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage
                className={styles.logo}
                alt="logo rubrique"
                maskShape="wide"
                src={data.getArticle?.logo ?? heroImage}
            />
            <h1 className={styles.title}>{data.getArticle?.titre}</h1>
            {data.getArticle?.texte && <RemoteHtml html={data.getArticle?.texte} className={styles.content} />}
        </div>
    );
}
