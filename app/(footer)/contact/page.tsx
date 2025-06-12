import { RubriquePresentationQuery, SimpleArticleQuery } from '@graphql/__generated__/graphql';
import { RUBRIQUE_PRESENTATION, SIMPLE_ARTICLE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import { AddessesWrapper } from './clientComponents';
import styles from './page.module.css';

const ArticleSection = async ({ id, className }: { id: string; className?: string }) => {
    const { data } = await query<SimpleArticleQuery>({
        query: SIMPLE_ARTICLE,
        variables: { id: parseInt(id ?? '') },
    });

    return (
        <div className={className}>
            <h2>{data.getArticle?.titre}</h2>
            {data.getArticle?.texte && <RemoteHtml html={data.getArticle.texte} />}
        </div>
    );
};

export default async function Contact() {
    const { data } = await query<RubriquePresentationQuery>({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUES_CONTACT_ID ?? '') },
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
                    id={process.env.SPIP_RUBRIQUES_CONTACT_ARTICLES_NOUS_JOINDRE_ID ?? ''}
                    className={styles.nousRejoindre}
                />

                <AddessesWrapper
                    bureauxAdministratifsSection={
                        <ArticleSection
                            id={process.env.SPIP_RUBRIQUES_CONTACT_ARTICLES_BUREAUX_ADMINISTRATIFS_ID ?? ''}
                        />
                    }
                    urbanLabSection={
                        <ArticleSection id={process.env.SPIP_RUBRIQUES_CONTACT_ARTICLES_URBAN_LAB_ID ?? ''} />
                    }
                    className={styles.wrapper}
                />

                <ArticleSection
                    id={process.env.SPIP_RUBRIQUES_CONTACT_ARTICLES_LACLASSE_ID ?? ''}
                    className={styles.laclasse}
                />

                <ArticleSection
                    id={process.env.SPIP_RUBRIQUES_CONTACT_ARTICLES_RESEAUX_SOCIAUX_ID ?? ''}
                    className={styles.reseauxSociaux}
                />
            </div>
        </div>
    );
}
