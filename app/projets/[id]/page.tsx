import { FragmentType, getFragmentData } from '@graphql/__generated__';
import { ArticleInformationFieldsFragmentDoc, ArticleQuery } from '@graphql/__generated__/graphql';
import { ARTICLE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import { dateFormat } from '@utils/dateUtils';
import ArticlePrototype from './articlePrototype';
import styles from './page.module.css';

//Pre-fetch some articles during build time
export async function generateStaticParams() {
    //TODO: implement logic
    return [{ id: '2125' }];
}

const ArticlePresentation = ({ data, isPrototype }: { data: ArticleQuery; isPrototype: boolean }) => {
    const articleInformationFieldsFragment = getFragmentData(
        ArticleInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleInformationFieldsFragmentDoc>
    );

    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={data.getArticle?.logo ?? data.getArticle?.rubrique?.logo ?? heroImage}
                alt="logo de l'article"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{articleInformationFieldsFragment.titre}</h1>
            <Tag value={isPrototype ? 'prototype' : 'article'} className={styles.tag} />
            <p className={styles.date}>{dateFormat(articleInformationFieldsFragment.date)}</p>
            <ul className={styles.authors}>
                {data.getArticle?.auteurs?.result && data.getArticle?.auteurs?.result?.length > 0 && <li>Par :</li>}
                {data.getArticle?.auteurs?.result?.map(author => {
                    return <li key={author?.id}>{author?.titre}</li>;
                })}
            </ul>
        </div>
    );
};

const ArticleCommon = ({ data }: { data: ArticleQuery }) => {
    return <>{data.getArticle?.texte && <RemoteHtml html={data.getArticle.texte} />} </>;
};

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await query<ArticleQuery>({ query: ARTICLE, variables: { id: parseInt(id) } });

    const isPrototype: boolean = data.getArticle?.isprototype === 'on';

    return (
        <>
            <div className={`${styles.mainContainer} ${styles.localVariables}`}>
                <ArticlePresentation data={data} isPrototype={isPrototype} />

                <div className={styles.contentContainer}>
                    {isPrototype ? <ArticlePrototype data={data} /> : <ArticleCommon data={data} />}
                </div>
            </div>
        </>
    );
}
