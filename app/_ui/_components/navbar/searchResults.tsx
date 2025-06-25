'use client';

import { useIsDesktop } from '@hooks/useIsDesktop';
import { useSearchResults } from '@hooks/useSearchResults';
import ArticleList from '@ui/components/articleList';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import { SearchFilterItem, searchFilterMap } from '@utils/searchUtils';
import styles from './searchResults.module.css';

export default function SearchResults({
    searchInput,
    searchFilter,
    className,
}: {
    searchInput: string;
    searchFilter: SearchFilterItem;
    className?: string;
}) {
    const isDesktop = useIsDesktop();

    const { articles, rubriques } = useSearchResults({ searchInput: searchInput });

    const shouldDisplay = (filter: SearchFilterItem): boolean => {
        return searchFilter === searchFilterMap.tout || searchFilter === filter;
    };

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            {isDesktop && <h3 className={styles.searchInput}>{`RECHERCHE: ${searchInput.toUpperCase()}`}</h3>}

            {shouldDisplay(searchFilterMap.article) && articles && articles.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`ARTICLES: ${articles.length}`}</h4>
                    <ArticleList articles={articles} />
                </div>
            )}

            {shouldDisplay(searchFilterMap.rubrique) && rubriques && rubriques.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`RUBRIQUES: ${rubriques.length}`}</h4>
                    <RubriqueProjetsAccordion projets={rubriques} />
                </div>
            )}
        </div>
    );
}
