import ccnLogo from '@public/programme-ccn.png';
import datagoraLogo from '@public/programme-datagora.png';
import incubationLogo from '@public/programme-incubation.jpg';

const pageTexts = {
    currentTopicsSection: {
        title: 'En ce moment',
        archivesTitle: 'Archive',
    },
    programmesSection: {
        title: 'Programmes',
        imageCardsContent: [
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
        ],
    },
};

export { pageTexts };
