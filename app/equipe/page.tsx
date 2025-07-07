import { ActiveAuthorsQuery } from '@graphql/__generated__/graphql';
import { ACTIVE_AUTHORS } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import Link from 'next/link';
import styles from './page.module.css';

const pageTexts = {
    descriptionSection: `L'équipe`,
    teamSection: 'Les contributeurs',
    partnersSection: 'Nos partenaires',
};

const TeamSection = ({ data }: { data: ActiveAuthorsQuery }) => {
    return (
        <div className={`${styles.team} ${styles.sectionContainer}`}>
            <h2>{pageTexts.teamSection}</h2>
            <div className={styles.tagsContainer}>
                {data.getRubrique?.articles?.result?.map(article => {
                    const author = article?.auteurs?.result?.at(0);
                    return (
                        <Link className={styles.tagStyle} key={article?.id} href={`/equipe/${author?.id}`}>
                            {author?.titre}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default async function Equipe() {
    const { data } = await getClient().query({
        query: ACTIVE_AUTHORS,
        variables: { idRubriqueTrombinoscope: parseInt(process.env.SPIP_RUBRIQUE_TROMBINOSCOPE ?? '') },
    });

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage
                className={styles.logo}
                alt="logo page"
                maskShape="wide"
                src={data.getRubrique?.logo ?? heroImage}
            />
            {data?.getRubrique?.texte && (
                <h5 className={styles.description}>
                    <RemoteHtml html={data.getRubrique.texte} />
                </h5>
            )}

            <TeamSection data={data} />
        </div>
    );
}
