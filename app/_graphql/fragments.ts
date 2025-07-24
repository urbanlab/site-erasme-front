import { gql } from './__generated__';

const PAGINATION_FIELDS_FRAGMENT = gql(`
    fragment paginationFields on Pagination {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
        totalItems
    }
`);

const RUBRIQUE_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment rubriqueBasicInformationFields on Rubrique {
        id
        titre
        texte
        logo
    }
`);

const RUBRIQUE_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment rubriqueFullInformationFields on Rubrique {
        ...rubriqueBasicInformationFields

        #Get all articles from rubrique
        articles(pagination: 500) {
            result {
                ...articleBasicInformationFields
            }
        }
    }
`);

const ARTICLE_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleBasicInformationFields on Article {
        id
        titre
        date
        logo
        isprototype
    }
`);

const ARTICLE_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleFullInformationFields on Article {
        id
        titre
        texte
        logo
        date
        isprototype
    }
`);

const PROTOTYPE_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment prototypeInformationFields on Article {
        description_title
        description
        description_title_second
        description_second
        chiffres_cles
        description_lateral_title
        description_lateral
        developpement
        description_title_third
        description_third
        descr_tech_technique
        descr_tech_devices
        descr_tech_framework
        descr_tech_depot
        descr_tech_licence

        #Get all images
        documents(pagination: 100, where:"media=image") {
            result {
                ...documentFullInformationFields
            }
        }
    }
`);

const AUTEUR_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment auteurBasicInformationFields on Auteur {
        id
        titre
    }
`);

const AUTEUR_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment auteurFullInformationFields on Auteur {
        id
        titre
        logo
        descriptif
        email
        auteur_compte_linkedin
        auteur_compte_twitter
    }
`);

const MOT_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment motBasicInformationFields on Mot {
        id
        titre
        logo
    }
`);

const DOCUMENT_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment documentBasicInformationFields on Document {
        id
        titre
        media
    }
`);

const DOCUMENT_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment documentFullInformationFields on Document {
        id
        media
        fichier
        largeur
        hauteur
        alt
    }
`);

const LIST_PROJETS_FIELDS_FRAGMENT = gql(`
    fragment listProjetsFields on Rubrique{
        id
        titre
        texte
        date
        articles(orderby: $articlesInRubriqueOrderBy, pagination: $pagination) {
            ...on ArticlePagination {
                pagination {
                    ...paginationFields
                }
                result {
                    ...articleBasicInformationFields
                
                    mots(pagination: $pagination) {
                        result {
                            ...motsAndGroupeMotsFields
                        }
                    }

                    auteurs(where: $whereAuteurs, pagination: $pagination) @include(if: $withAuteurs) {
                        result {
                            ...auteurBasicInformationFields
                        }
                    }
                }
            }
        }
    }
`);

const MOTS_AND_GROUPE_MOTS_FIELDS_FRAGMENT = gql(`
    fragment motsAndGroupeMotsFields on Mot {
        id
        titre
        groupe {
            id
            titre
        }
    }    
`);

export {
    PAGINATION_FIELDS_FRAGMENT,
    RUBRIQUE_BASIC_INFORMATION_FIELDS_FRAGMENT,
    RUBRIQUE_FULL_INFORMATION_FIELDS_FRAGMENT,
    ARTICLE_BASIC_INFORMATION_FIELDS_FRAGMENT,
    ARTICLE_FULL_INFORMATION_FIELDS_FRAGMENT,
    PROTOTYPE_INFORMATION_FIELDS_FRAGMENT,
    MOTS_AND_GROUPE_MOTS_FIELDS_FRAGMENT,
    LIST_PROJETS_FIELDS_FRAGMENT,
    AUTEUR_BASIC_INFORMATION_FIELDS_FRAGMENT,
    AUTEUR_FULL_INFORMATION_FIELDS_FRAGMENT,
    MOT_BASIC_INFORMATION_FIELDS_FRAGMENT,
    DOCUMENT_BASIC_INFORMATION_FIELDS_FRAGMENT,
    DOCUMENT_FULL_INFORMATION_FIELDS_FRAGMENT,
};
