'use client';

import { useIsDesktop } from '@hooks/useIsDesktop';
import { useSearchResults } from '@hooks/useSearchResults';
import ArticleList from '@ui/components/articleList';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import { searchFilterMap } from '@utils/searchUtils';
import styles from './searchResults.module.css';
import { ControlledComponentType } from '@globals/types';

export default function SearchResults({
    searchInput,
    searchFilter,
    handleNavigation,
    className,
}: {
    searchInput: string;
    searchFilter: ControlledComponentType;
    handleNavigation?: () => void;
    className?: string;
}) {
    const isDesktop = useIsDesktop();

    const { articles, rubriques } = useSearchResults({ searchInput: searchInput });

    const shouldDisplay = (filter: ControlledComponentType): boolean => {
        return searchFilter === searchFilterMap.tout || searchFilter === filter;
    };

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            {isDesktop && <h3 className={styles.searchInput}>{`RECHERCHE: ${searchInput.toUpperCase()}`}</h3>}

            {shouldDisplay(searchFilterMap.article) && articles && articles.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`ARTICLES: ${articles.length}`}</h4>
                    <ArticleList articles={articles} handleNavigation={handleNavigation} />
                </div>
            )}

            {shouldDisplay(searchFilterMap.rubrique) && rubriques && rubriques.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`RUBRIQUES: ${rubriques.length}`}</h4>
                    <RubriqueProjetsAccordion projets={rubriques} handleNavigation={handleNavigation} />
                </div>
            )}
        </div>
    );
}
