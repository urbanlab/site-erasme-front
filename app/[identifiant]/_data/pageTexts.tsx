const prototypeCards = [
    {
        title: 'METHODO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_METHODOLOGIES_DE_DEVELOPPEMENT_ID ?? '',
        hasLink: false,
    },
    {
        title: 'USAGES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_USAGES_ID ?? '',
        hasLink: false,
    },
    {
        title: 'TECHNO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_TECHNOLOGIES_ID ?? '',
        hasLink: false,
    },
];

const ecosystemeCards = [
    {
        title: 'PARTENAIRES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '',
        hasLink: true,
    },
    {
        title: 'UTILISATEURS',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_UTILISATEURS_ID ?? '',
        hasLink: false,
    },
    {
        title: 'ENTREPRISES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_ENTREPRISES_ID ?? '',
        hasLink: false,
    },
];

export { ecosystemeCards, prototypeCards };
