'use client';

import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ArticleBasicInformationFieldsFragment,
    ArticleBasicInformationFieldsFragmentDoc,
    DocumentBasicInformationFieldsFragment,
    DocumentBasicInformationFieldsFragmentDoc,
    ListProjetsFieldsFragment,
    ListProjetsFieldsFragmentDoc,
    SearchQuery,
} from '@graphql/__generated__/graphql';
import { SEARCH } from '@graphql/queries';
import { useEffect, useState } from 'react';

type SearchResults = {
    articles: ArticleBasicInformationFieldsFragment[];
    rubriques: ListProjetsFieldsFragment[];
    documents: DocumentBasicInformationFieldsFragment[];
    images: DocumentBasicInformationFieldsFragment[];
};

export function useSearchResults({ searchInput }: { searchInput: string }) {
    const [searchResults, setSearchResults] = useState<SearchResults>({
        articles: [],
        rubriques: [],
        documents: [],
        images: [],
    });

    const { data } = useSuspenseQuery<SearchQuery>(SEARCH, {
        variables: {
            texte: searchInput,
            where: `statut="publie"`,
            generalOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
        },
    });
    useEffect(() => {
        const searchQuery = () => {
            const articles = getFragmentData(
                ArticleBasicInformationFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Article') as FragmentType<
                    typeof ArticleBasicInformationFieldsFragmentDoc
                >[]
            );

            const rubriques = getFragmentData(
                ListProjetsFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Rubrique') as FragmentType<
                    typeof ListProjetsFieldsFragmentDoc
                >[]
            );

            const documentsFragment = getFragmentData(
                DocumentBasicInformationFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Document') as FragmentType<
                    typeof DocumentBasicInformationFieldsFragmentDoc
                >[]
            );
            const documents = documentsFragment.filter(item => item.media === 'file');
            const images = documentsFragment.filter(item => item.media === 'image');

            setSearchResults({ articles: articles, rubriques: rubriques, documents: documents, images: images });
        };

        searchQuery();

        //clean-up function
        return () => {};
    }, [data.recherche?.result]);

    return { ...searchResults };
}
