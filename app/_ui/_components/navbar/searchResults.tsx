'use client';

import { ControlledComponentValueType } from '@globals/types';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { useSearchResults } from '@hooks/useSearchResults';
import ArticleList from '@ui/components/articleList';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import { searchFilterMap } from '@utils/searchUtils';
import styles from './searchResults.module.css';

export default function SearchResults({
    searchInput,
    searchFilter,
    handleNavigation,
    className,
}: {
    searchInput: string;
    searchFilter: ControlledComponentValueType;
    handleNavigation?: () => void;
    className?: string;
}) {
    const isDesktop = useIsDesktop();

    const { articles, projets, documents, images } = useSearchResults({ searchInput: searchInput });

    const shouldDisplay = (filter: ControlledComponentValueType): boolean => {
        return searchFilter === searchFilterMap.tout.value || searchFilter === filter;
    };

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            {isDesktop && <h3 className={styles.searchInput}>{`RECHERCHE : ${searchInput.toUpperCase()}`}</h3>}

            {shouldDisplay(searchFilterMap.article.value) && articles && articles.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`ARTICLES : ${articles.length}`}</h4>
                    <ArticleList articles={articles} handleNavigation={handleNavigation} />
                </div>
            )}

            {shouldDisplay(searchFilterMap.projet.value) && projets && projets.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`PROJETS : ${projets.length}`}</h4>
                    <RubriqueProjetsAccordion projets={projets} handleNavigation={handleNavigation} />
                </div>
            )}

            {shouldDisplay(searchFilterMap.document.value) && documents && documents.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`DOCUMENTS : ${documents.length}`}</h4>
                    <ul>
                        {documents.map(item => (
                            <li key={item.id}>{item.titre}</li>
                        ))}
                    </ul>
                </div>
            )}

            {shouldDisplay(searchFilterMap.image.value) && images && images.length > 0 && (
                <div>
                    <h4 className={styles.sectionTitle}>{`IMAGES : ${images.length}`}</h4>
                    <ul>
                        {images.map(item => (
                            <li key={item.id}>{item.titre}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
