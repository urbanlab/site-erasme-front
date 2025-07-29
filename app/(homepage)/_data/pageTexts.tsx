import ccnLogo from '@public/programme-ccn.png';
import datagoraLogo from '@public/programme-datagora.png';
import incubationLogo from '@public/programme-incubation.jpg';

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
        link: `/projets/${process.env.SPIP_RUBRIQUE_PROJETS_INCUBATION_IDENTIFIANT}`,
        isInternalLink: true,
    },
    {
        title: 'CCN',
        image: ccnLogo,
        link: `/projets/${process.env.SPIP_RUBRIQUE_PROJETS_CCN_IDENTIFIANT}`,
        isInternalLink: true,
    },
];

export { imageCardsContent, pageTexts };
