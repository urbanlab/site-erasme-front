import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    ArticleBasicInformationFieldsFragment,
    ArticleBasicInformationFieldsFragmentDoc,
    ArticleFullInformationFieldsFragment,
    ArticleFullInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { HOMEPAGE } from '@graphql/queries';
import cubeShapedIcon from '@public/cube-shaped-icon.svg';
import doubleArrowShapedIcon from '@public/double-arrow-shaped-icon.svg';
import heroImage from '@public/hero-img.svg';
import ccnLogo from '@public/programme-ccn.png';
import datagoraLogo from '@public/programme-datagora.png';
import incubationLogo from '@public/programme-incubation.jpg';
import xShapedIcon from '@public/x-shaped-icon.svg';
import { getClient } from '@services/apollo/apolloClient';
import ArticleCard from '@ui/components/articleCard';
import ImageCard from '@ui/components/imageCard';
import ShapedImage from '@ui/components/shapedImage';
import LinkButton from '@ui/elements/linkButton';
import { ArchiveArticleCard } from 'clientComponents';
import Image from 'next/image';
import styles from './page.module.css';

const pageTexts = {
    presentationSection: {
        title: "Laboratoire d'innovation ouverte",
        description:
            'Service public d’innovation unique en France, Erasme contribue depuis 2015, par son action, à la politique d’innovation publique et numérique de la Métropole de Lyon.',
    },
    currentTopicsSection: {
        title: 'En ce moment',
        archivesTitle: 'Archive',
    },
    AccomplishmentsSection: {
        title: 'Réalisations',
    },
    ProgramsSection: {
        title: 'Programmes',
    },
    servicesSection: {
        title: 'Services',
    },
    missionSection: {
        title: 'Mission',
        description:
            'Notre mission est de répondre aux enjeux sociétaux et aux nouveaux défis posés à nos politiques publiques, en proposant des idées concrètes et testables dans un temps court, pour répondre aux problématiques du territoire.',
    },
};

const imageCardsContent = [
    {
        title: 'DATAGORA',
        image: datagoraLogo,
        link: 'https://datagora.erasme.org/',
        isInternalLink: false,
    },
    {
        title: 'INCUBATION',
        image: incubationLogo,
        link: `/projets/${process.env.SPIP_RUBRIQUE_PROJETS_INCUBATION_ID}`,
        isInternalLink: true,
    },
    {
        title: 'CCN',
        image: ccnLogo,
        link: `/projets/${process.env.SPIP_RUBRIQUE_PROJETS_CCN_ID}`,
        isInternalLink: true,
    },
];

const PresentationSection = () => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={heroImage} alt="" maskShape="wide" className={styles.presentationImage} />
            <div className={styles.presentationTextContainer}>
                <h1>{pageTexts.presentationSection.title}</h1>
                <h5>{pageTexts.presentationSection.description}</h5>
            </div>
        </div>
    );
};

const EnCeMomentSection = ({
    articles,
    archiveArticleIdList,
}: {
    articles: ArticleFullInformationFieldsFragment[];
    archiveArticleIdList: string[];
}) => {
    const textLength: number = 130;

    return (
        <div className={styles.currentTopicsContainer}>
            <h2>{pageTexts.currentTopicsSection.title}</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.spotlightCardsContainer}>
                    {articles.map(article => (
                        <ArticleCard
                            article={article}
                            variant="spotlight"
                            className={styles.cardSizing}
                            textLength={textLength}
                            key={article.id}
                        />
                    ))}
                </div>
                <ArchiveArticleCard
                    articleIdList={archiveArticleIdList}
                    textLength={textLength}
                    className={styles.archivesContainer}
                />
            </div>
        </div>
    );
};

const ProgrammesSection = () => {
    return (
        <div className={styles.programsContainer}>
            <h2>{pageTexts.ProgramsSection.title}</h2>
            <div className={styles.imageCardsContainer}>
                {imageCardsContent.map((card, index) => (
                    <ImageCard
                        className={styles.imageCard}
                        title={card.title}
                        image={card.image.src}
                        link={card.link}
                        isInternalLink={card.isInternalLink}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

const ServicesSection = ({ articles }: { articles: ArticleBasicInformationFieldsFragment[] }) => {
    return (
        <div className={styles.servicesContainer}>
            <h2>{pageTexts.servicesSection.title}</h2>
            <div className={styles.tagIconWrapper}>
                <Image src={xShapedIcon} alt="" className={`${styles.desktopDisplayOnly} ${styles.firstIcon}`} />
                <div className={styles.tagsContainer}>
                    {articles.map(article => (
                        <LinkButton
                            key={article.id}
                            href={`/services#${article.titre}`}
                            variant="ghost"
                            className={styles.serviceTag}
                        >
                            {article.titre}
                        </LinkButton>
                    ))}
                </div>
                <Image src={cubeShapedIcon} alt="" className={`${styles.desktopDisplayOnly} ${styles.secondIcon}`} />
            </div>
        </div>
    );
};

const MissionsSection = () => {
    return (
        <div className={styles.missionContainer}>
            <h2 className={styles.title}>{pageTexts.missionSection.title}</h2>
            <p className={styles.description}>{pageTexts.missionSection.description}</p>
            <Image alt="" src={doubleArrowShapedIcon} className={`${styles.desktopDisplayOnly} ${styles.icon}`} />
        </div>
    );
};

export default async function Home() {
    const { data } = await getClient().query({
        query: HOMEPAGE,
        variables: {
            idMotActus: parseInt(process.env.SPIP_MOT_ACTUS_ID ?? ''),
            idRubriqueServices: parseInt(process.env.SPIP_RUBRIQUE_SERVICES_ID ?? ''),
        },
    });

    const enCeMomentArticles = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getMot?.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
    );

    const servicesArticles = getFragmentData(
        ArticleBasicInformationFieldsFragmentDoc,
        data.getRubrique?.articles?.result as FragmentType<typeof ArticleBasicInformationFieldsFragmentDoc>[]
    );

    // Get a list of existing articles IDs for the archive section
    const archiveArticleIdList: string[] = data.articles?.result?.map(article => article?.id ?? '') ?? [];

    //TODO: end implementation of the homepage

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <PresentationSection />

            <EnCeMomentSection articles={enCeMomentArticles} archiveArticleIdList={archiveArticleIdList} />

            {/* ACCOMPLISHMENTS (Réalisations) SECTION */}

            <ProgrammesSection />

            <ServicesSection articles={servicesArticles} />

            <MissionsSection />
        </div>
    );
}
