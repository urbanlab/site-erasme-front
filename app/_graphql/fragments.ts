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
const ARTICLE_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleInformationFields on Article {
        id
        titre
        date
        date_modif
        isprototype
    }
`);

const LIST_PROJETS_FIELDS_FRAGMENT = gql(`
    fragment listProjetsFields on Rubrique{
        id
        titre
        texte
        date
        articles(orderby: $articlesInRubriqueOrderBy) {
            ... on ArticlePagination {
                pagination {
                    ...paginationFields
                }
                result {
                    ...articleInformationFields
                }
                
            }
        }
    }
`)

const MOTS_AND_GROUPE_MOTS_FROM_ARTICLE_FIELDS_FRAGMENT = gql(`
    fragment motsAndGroupMotsFromArticleFields on MotPagination {
        result{
            id
            titre
            groupe {
                id
                titre
            }
        }
    }    
`);

const DOCUMENTS_FROM_ARTICLE_FIELDS_FRAGMENT = gql(`
    fragment documentsFromArticleFields on DocumentPagination {
        result {
            id
            alt
            hauteur
            largeur
            fichier
        }
    }
`);

export {
    PAGINATION_FIELDS_FRAGMENT,
    ARTICLE_INFORMATION_FIELDS_FRAGMENT,
    MOTS_AND_GROUPE_MOTS_FROM_ARTICLE_FIELDS_FRAGMENT,
    DOCUMENTS_FROM_ARTICLE_FIELDS_FRAGMENT,
    LIST_PROJETS_FIELDS_FRAGMENT,
};
