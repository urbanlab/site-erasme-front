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
        identifiant
        titre
        texte
        logo
    }
`);

const RUBRIQUE_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment rubriqueFullInformationFields on Rubrique {
        id
        identifiant
        titre
        texte
        logo

        titre_section_supplementaire_1
        texte_section_supplementaire_1
        titre_section_supplementaire_2
        texte_section_supplementaire_2
        titre_section_stades_dev
        texte_section_stades_dev
        data_section_stades_dev
        titre_section_chiffres_cles
        texte_section_chiffres_cles

        documents(pagination: 100, where:"media=image") {
            result {
                ...documentFullInformationFields
            }
        }
    }
`);

const ARTICLE_BASIC_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleBasicInformationFields on Article {
        id
        identifiant
        titre
        date
        logo
        isprototype
    }
`);

const ARTICLE_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleFullInformationFields on Article {
        id
        identifiant
        titre
        texte
        logo
        date
        isprototype

        documents(pagination: 100, where:"media=image") {
            result {
                ...documentFullInformationFields
            }
        }
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
        identifiant
        titre
    }
`);

const AUTEUR_FULL_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment auteurFullInformationFields on Auteur {
        id
        identifiant
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
        identifiant
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

                    auteurs(pagination: $pagination) @include(if: $withAuteurs) {
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
        identifiant
        titre
        groupe {
            id
            titre
        }
    }    
`);

export {
    ARTICLE_BASIC_INFORMATION_FIELDS_FRAGMENT,
    ARTICLE_FULL_INFORMATION_FIELDS_FRAGMENT,
    AUTEUR_BASIC_INFORMATION_FIELDS_FRAGMENT,
    AUTEUR_FULL_INFORMATION_FIELDS_FRAGMENT,
    DOCUMENT_BASIC_INFORMATION_FIELDS_FRAGMENT,
    DOCUMENT_FULL_INFORMATION_FIELDS_FRAGMENT,
    LIST_PROJETS_FIELDS_FRAGMENT,
    MOT_BASIC_INFORMATION_FIELDS_FRAGMENT,
    MOTS_AND_GROUPE_MOTS_FIELDS_FRAGMENT,
    PAGINATION_FIELDS_FRAGMENT,
    PROTOTYPE_INFORMATION_FIELDS_FRAGMENT,
    RUBRIQUE_BASIC_INFORMATION_FIELDS_FRAGMENT,
    RUBRIQUE_FULL_INFORMATION_FIELDS_FRAGMENT,
};
