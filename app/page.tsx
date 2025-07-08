import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    ArticleBasicInformationFieldsFragment,
    ArticleBasicInformationFieldsFragmentDoc,
    ArticleFullInformationFieldsFragment,
    ArticleFullInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { HOMEPAGE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import ArticleCard from '@ui/components/articleCard';
import ImageCard from '@ui/components/imageCard';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import { ArchiveArticleCard } from 'clientComponents';
import Link from 'next/link';
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
        tags: ['DATAGORA', 'INCUBATION', 'BIEN VIVRE', 'MÉDIATION'],
    },
    servicesSection: {
        title: 'Services',
        tags: ['Inspirer', 'Explorer', 'Accélérer'],
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
        image: heroImage,
        link: 'https://google.com',
    },
    {
        title: 'INCUBATION',
        image: heroImage,
        link: 'https://google.com',
    },
    {
        title: 'BIEN VIVRE',
        image: heroImage,
        link: 'https://google.com',
    },
    {
        title: 'MÉDIATION',
        image: heroImage,
        link: 'https://google.com',
    },
];

const PresentationSection = () => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={heroImage} alt="Logo Erasme" maskShape="wide" className={styles.presentationImage} />
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
                    <ImageCard className={styles.imageCard} title={card.title} image={card.image} key={index} />
                ))}
            </div>
        </div>
    );
};

const ServicesSection = ({ articles }: { articles: ArticleBasicInformationFieldsFragment[] }) => {
    return (
        <div className={styles.servicesContainer}>
            <h2>{pageTexts.servicesSection.title}</h2>
            <div className={styles.tagsContainer}>
                {articles.map(article => (
                    <Link key={article.id} href={`/services#${article.titre}`}>
                        <Tag value={article.titre ?? ''} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const MissionsSection = () => {
    return (
        <div className={styles.missionContainer}>
            <h2>{pageTexts.missionSection.title}</h2>
            <p>{pageTexts.missionSection.description}</p>
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
