import heroImage from '@public/hero-img.svg';
import Card from '@ui/components/card';
import ImageCard from '@ui/components/imageCard';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/elements/tag';
import Link from 'next/link';
import styles from './page.module.css';
import { getClient } from '@services/apollo/apolloClient';
import { HOMEPAGE } from '@graphql/queries';
import { HomepageQuery } from '@graphql/__generated__/graphql';

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

const cardsContent = [
    {
        title: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        date: '07/12/2021',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
        title: 'Eadipisicing elit. Quisquam, voluptatum.',
        date: '07/12/2021',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
        title: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        date: '07/12/2021',
        body: 'Lorem ipsum dolor sit amet conseipsum dolor sit amet consecteturipsum dolor sit amet consecteturipsum dolor sit amet consecteturipsum dolor sit amet consecteturipsum dolor sit amet consecteturipsum dolor sit amet consecteturctetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
        title: 'E voluptatum.',
        date: '07/11/2021',
        body: 'Lorem ipsum dolo, voluptatum.',
    },
];

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

const EnCeMomentSection = () => {
    return (
        <div className={styles.currentTopicsContainer}>
            <h2>{pageTexts.currentTopicsSection.title}</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.spotlightCardsContainer}>
                    {cardsContent.map((card, index) => (
                        <Card
                            className={styles.card}
                            variant="filled"
                            title={card.title}
                            date={card.date}
                            body={card.body}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.archivesContainer}>
                    <Card
                        className={styles.card}
                        variant="ghost"
                        title="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                        date="07/12/2021"
                        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    />
                </div>
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

const ServicesSection = () => {
    return (
        <div className={styles.servicesContainer}>
            <h2>{pageTexts.servicesSection.title}</h2>
            <div className={styles.tagsContainer}>
                {pageTexts.servicesSection.tags.map((tag, index) => (
                    <Link key={index} href={`/services#${tag}`}>
                        <Tag value={tag} />
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
    const { data } = await getClient().query<HomepageQuery>({
        query: HOMEPAGE,
        variables: {
            idMotActus: parseInt(process.env.SPIP_MOT_ACTUS_ID ?? ''),
        },
    });

    //TODO: end implementation of the homepage

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <PresentationSection />

            <EnCeMomentSection />

            {/* ACCOMPLISHMENTS (Réalisations) SECTION */}

            <ProgrammesSection />

            <ServicesSection />

            <MissionsSection />
        </div>
    );
}
