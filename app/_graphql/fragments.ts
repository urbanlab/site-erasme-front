import { gql } from './__generated__';

const PAGINATION_FIELDS_FRAGMENT = gql(`
    fragment paginationFields on Pagination {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
    }
`);
const ARTICLE_INFORMATION_FIELDS_FRAGMENT = gql(`
    fragment articleInformationFields on Article {
        id
        titre
        date
        date_modif
    }
`);

export {PAGINATION_FIELDS_FRAGMENT, ARTICLE_INFORMATION_FIELDS_FRAGMENT};