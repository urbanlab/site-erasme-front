import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import { ArticleFullInformationFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { ARTICLE, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import { AddessesWrapper } from './clientComponents';
import styles from './page.module.css';

const ArticleSection = async ({ id, className }: { id: string; className?: string }) => {
    const { data } = await getClient().query({
        query: ARTICLE,
        variables: { id: parseInt(id ?? '') },
    });

    const article = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    return (
        <div className={className}>
            <h2>{article.titre}</h2>
            {article.texte && <RemoteHtml html={article.texte} />}
        </div>
    );
};

export default async function Contact() {
    const { data } = await getClient().query({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUE_CONTACT_ID ?? '') },
    });

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage
                className={styles.logo}
                alt="logo rubrique"
                maskShape="wide"
                src={data.getRubrique?.logo ?? heroImage}
            />

            <div className={styles.contentContainer}>
                <ArticleSection
                    id={process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_NOUS_JOINDRE_ID ?? ''}
                    className={styles.nousRejoindre}
                />

                <AddessesWrapper
                    bureauxAdministratifsSection={
                        <ArticleSection
                            id={process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_BUREAUX_ADMINISTRATIFS_ID ?? ''}
                        />
                    }
                    urbanLabSection={
                        <ArticleSection id={process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_URBAN_LAB_ID ?? ''} />
                    }
                    className={styles.wrapper}
                />

                <ArticleSection
                    id={process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_LACLASSE_ID ?? ''}
                    className={styles.laclasse}
                />

                <ArticleSection
                    id={process.env.SPIP_RUBRIQUE_CONTACT_ARTICLE_RESEAUX_SOCIAUX_ID ?? ''}
                    className={styles.reseauxSociaux}
                />
            </div>
        </div>
    );
}
