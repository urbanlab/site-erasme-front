import { FragmentType, getFragmentData } from '@graphql/__generated__';
import { MotsAndGroupeMotsFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { ACTIVE_AUTHORS, MOTS_FROM_GROUPE_MOTS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import LinkButton from '@ui/elements/linkButton';
import Link from 'next/link';
import styles from './page.module.css';

const pageTexts = {
    descriptionSection: `L'équipe`,
    teamSection: 'Les contributeurs',
    partnersSection: 'Nos partenaires',
};

const TeamSection = async () => {
    const { data } = await getClient().query({
        query: ACTIVE_AUTHORS,
        variables: { idRubriqueTrombinoscope: parseInt(process.env.SPIP_RUBRIQUE_TROMBINOSCOPE ?? '') },
    });

    return (
        <div className={`${styles.team} ${styles.sectionContainer}`}>
            <h2>{pageTexts.teamSection}</h2>
            <div className={styles.tagsContainer}>
                {data.getRubrique?.articles?.result?.map(article => {
                    const author = article?.auteurs?.result?.at(0);
                    return (
                        <LinkButton href={`/equipe/${author?.id}`} variant="ghost" key={article?.id}>
                            {author?.titre}
                        </LinkButton>
                    );
                })}
            </div>
        </div>
    );
};

const PartnersSection = async () => {
    const { data } = await getClient().query({
        query: MOTS_FROM_GROUPE_MOTS,
        variables: { idGroupeMots: parseInt(process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '') },
    });

    const partnerListFragment = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data?.getGroupe_mots?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );
    const sortedPartnerList = partnerListFragment.slice().sort((a, b) => a.titre?.localeCompare(b.titre ?? '') ?? -1);

    return (
        <div className={`${styles.partners} ${styles.sectionContainer}`}>
            <h2>{pageTexts.partnersSection}</h2>
            <div className={styles.tagsContainer}>
                {sortedPartnerList.map(mot => {
                    const motFragment = getFragmentData(
                        MotsAndGroupeMotsFieldsFragmentDoc,
                        mot as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>
                    );

                    return (
                        <Link key={motFragment.id} href={`/mot-cle/${motFragment.id}`} className={styles.linkStyle}>
                            {motFragment.titre}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default async function Equipe() {
    const { data } = await getClient().query({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUE_TROMBINOSCOPE ?? '') },
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

            <TeamSection />
            <PartnersSection />
        </div>
    );
}
