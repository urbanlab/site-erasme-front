export const searchFilterMap = {
    tout: {
        label: 'Tout',
        value: '',
    },
    article: {
        label: 'Article',
        value: 'Article',
    },
    rubrique: {
        label: 'Rubrique',
        value: 'Rubrique',
    },
    image: {
        label: 'Image',
        value: 'Image',
    },
    document: {
        label: 'Document',
        value: 'Document',
    },
} ;

type SearchFilterKey = keyof typeof searchFilterMap;
// "tout" | "article" | "rubrique" | "image" | "document"

export type SearchFilterItem = (typeof searchFilterMap)[SearchFilterKey];
// { label: string; value: string }
