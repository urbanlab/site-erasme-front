import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    ArticleFullInformationFieldsFragment,
    ArticleFullInformationFieldsFragmentDoc,
    AuteurBasicInformationFieldsFragment,
    AuteurBasicInformationFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragmentDoc,
    PrototypeInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { ARTICLE_AND_PROTOTYPE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import { dateFormat } from '@utils/dateUtils';
import Link from 'next/link';
import ArticlePrototype from './articlePrototype';
import styles from './page.module.css';

//Pre-fetch some articles during build time
export async function generateStaticParams() {
    //TODO: implement logic
    return [{ id: '2125' }];
}

const ArticlePresentation = ({
    articleInformation,
    logoRubriqueParent,
    authors,
    isPrototype,
}: {
    articleInformation: ArticleFullInformationFieldsFragment;
    authors: AuteurBasicInformationFieldsFragment[];
    isPrototype: boolean;
    logoRubriqueParent: string | null | undefined;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={articleInformation.logo ?? logoRubriqueParent ?? heroImage}
                alt="logo de l'article"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{articleInformation.titre}</h1>
            <Tag value={isPrototype ? 'prototype' : 'article'} className={styles.tag} />
            <p className={styles.date}>{dateFormat(articleInformation.date)}</p>
            <ul className={styles.authors}>
                {authors && authors.length > 0 && <li>Par :</li>}
                {authors?.map(author => {
                    return (
                        <li key={author?.id} style={{ textDecoration: 'underline' }}>
                            <Link href={`/equipe/${author?.id}`}>{author?.titre}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const ArticleCommon = ({ articleInformation }: { articleInformation: ArticleFullInformationFieldsFragment }) => {
    return <>{articleInformation.texte && <RemoteHtml html={articleInformation.texte} />} </>;
};

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data } = await getClient().query({
        query: ARTICLE_AND_PROTOTYPE,
        variables: { id: parseInt(id) },
    });

    const articleInformationFieldsFragment = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    const prototypeInformationFieldsFragment = getFragmentData(
        PrototypeInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof PrototypeInformationFieldsFragmentDoc>
    );

    const authorsInformationFieldsFragment = getFragmentData(
        AuteurBasicInformationFieldsFragmentDoc,
        data.getArticle?.auteurs?.result as FragmentType<typeof AuteurBasicInformationFieldsFragmentDoc>[]
    );

    const motsAndGroupeMotsFieldsFragment = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data.getArticle?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    const isPrototype: boolean = articleInformationFieldsFragment.isprototype === '1';

    return (
        <>
            <div className={`${styles.mainContainer} ${styles.localVariables}`}>
                <ArticlePresentation
                    articleInformation={articleInformationFieldsFragment}
                    logoRubriqueParent={data.getArticle?.rubrique?.logo}
                    isPrototype={isPrototype}
                    authors={authorsInformationFieldsFragment}
                />

                <div className={styles.contentContainer}>
                    {isPrototype ? (
                        <ArticlePrototype
                            prototypeInformation={prototypeInformationFieldsFragment}
                            motsAndGroupeMots={motsAndGroupeMotsFieldsFragment}
                        />
                    ) : (
                        <ArticleCommon articleInformation={articleInformationFieldsFragment} />
                    )}
                </div>
            </div>
        </>
    );
}
