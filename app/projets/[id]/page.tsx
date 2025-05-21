import { ArticleQuery } from '@graphql/__generated__/graphql';
import { ARTICLE } from '@graphql/queries';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import { dateFormat } from '@utils/dateUtils';
import styles from './page.module.css';

//Pre-fetch some articles during build time
export async function generateStaticParams() {
    //TODO: implement logic
    return [{ id: '2025' }];
}

const ArticlePresentation = ({ data }: { data: ArticleQuery }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={data.getArticle?.logo ?? data.getArticle?.rubrique?.logo ?? ''}
                alt="logo de l'article"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{data.getArticle?.titre}</h1>
            <Tag value="projet" className={styles.tag} />
            <p className={styles.date}>{dateFormat(data.getArticle?.date)}</p>
            <div className={styles.authors}>
                {'Par :'}
                {data.getArticle?.auteurs?.result?.map(author => {
                    return <li key={author?.id}>{author?.titre}</li>;
                })}
            </div>
        </div>
    );
};

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await query({ query: ARTICLE, variables: { id: parseInt(id) } });

    return (
        <>
            <div className={`${styles.mainContainer} ${styles.localVariables}`}>
                <ArticlePresentation data={data} />

                <div className={styles.contentContainer}>
                    {data.getArticle?.texte && <RemoteHtml html={data.getArticle.texte} />}
                </div>
            </div>
        </>
    );
}
