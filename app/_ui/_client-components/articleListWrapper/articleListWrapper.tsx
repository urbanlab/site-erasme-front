'use client';

import { ControlledComponentValueType } from '@globals/types';
import { ArticleBasicInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import ArticleList from '@ui/components/articleList';
import Pagination from '@ui/components/pagination';
import { itemsPerPageOptions } from '@utils';
import { useState } from 'react';
import styles from './articleListWrapper.module.css';
import SelectBox from '@ui/components/selectBox';

const pageTexts = {
    ListTitle: 'Réalisations',
};

export default function ArticleListWrapper({
    articles,
    className,
}: {
    articles: ArticleBasicInformationFieldsFragment[];
    className?: string;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ControlledComponentValueType>(itemsPerPageOptions[0].value);

    const itemsPerPageFallback: number = 10;

    const totalPages: number = Math.ceil(articles.length / ((itemsPerPage as number) ?? itemsPerPageFallback));
    const paginatedArticles: ArticleBasicInformationFieldsFragment[] = articles.slice(
        (currentPage - 1) * ((itemsPerPage as number) ?? itemsPerPageFallback),
        currentPage * ((itemsPerPage as number) ?? itemsPerPageFallback)
    );

    const handleItemsPerPageChange = (numberOfItems: ControlledComponentValueType) => {
        setCurrentPage(1);
        setItemsPerPage(numberOfItems ?? itemsPerPageFallback);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            <h2 className={styles.title}>{pageTexts.ListTitle}</h2>

            <SelectBox
                items={itemsPerPageOptions}
                value={itemsPerPage}
                handleValueChange={handleItemsPerPageChange}
                changeTriggerColorWhenFiltered={false}
                createPortal
                className={{ trigger: styles.itemsPerPage }}
            />

            <ArticleList articles={paginatedArticles} className={styles.articleList} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className={styles.pagination}
            />
        </div>
    );
}
