import { FragmentType, getFragmentData } from '@graphql/__generated__';
import { ArticleFullInformationFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { ARTICLE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

export default async function MentionsLegales() {
    const { data } = await getClient().query({
        query: ARTICLE,
        variables: { id: parseInt(process.env.SPIP_ARTICLE_MENTIONS_LEGALES_ID ?? '') },
    });

    const article = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage className={styles.logo} alt="logo rubrique" maskShape="wide" src={article.logo ?? heroImage} />
            <h1 className={styles.title}>{article.titre}</h1>
            {article.texte && <RemoteHtml html={article.texte} className={styles.content} />}
        </div>
    );
}
