'use client';

import { Separator } from '@base-ui-components/react';
import { ControlledComponentType, ControlledComponentValueType } from '@globals/types';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import {
    ArticleFullInformationFieldsFragmentDoc,
    ListProjetsFieldsFragment,
    MotsAndGroupeMotsFieldsFragment,
    MotsAndGroupeMotsFieldsFragmentDoc,
} from '@services/graphql/__generated__/graphql';
import { useIsDesktop } from '@hooks/useIsDesktop';
import ProjectList from '@ui/components/projectList';
import FilterPopover from '@ui/elements/filterPopover';
import Pagination from '@ui/elements/pagination';
import SelectBox from '@ui/elements/selectBox';
import ToggleGroup from '@ui/elements/toggleGroup';
import { useState } from 'react';
import styles from './projectListWrapper.module.css';

type ProjectListFilterFunctionType = (projectList: ListProjetsFieldsFragment[]) => ListProjetsFieldsFragment[];

const itemsPerPageOptions: ControlledComponentType[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
];
const articleTypeOptions: ControlledComponentType[] = [
    { label: 'Tout', value: null },
    { label: 'Article', value: '0' },
    { label: 'Prototype', value: '1' },
];

const pageTexts = {
    totalResults: 'Projets :',
};

const DesktopProjectListAndFilters = ({
    totalItems,
    itemsPerPage,
    handleItemsPerPageChange,
    paginatedProjects,
    currentPage,
    totalPages,
    handlePageChange,
    groupeMotsItems,
    groupeMotsFilter,
    handleGroupeMotsFilterChange,
    articleTypeItems,
    articleTypeFilter,
    handleArticleTypeFilter,
}: {
    totalItems: number;
    itemsPerPage: ControlledComponentValueType;
    handleItemsPerPageChange: (numberOfItems: ControlledComponentValueType) => void;
    paginatedProjects: ListProjetsFieldsFragment[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    groupeMotsItems: ControlledComponentType[];
    groupeMotsFilter: ControlledComponentValueType;
    handleGroupeMotsFilterChange: (value: ControlledComponentValueType) => void;
    articleTypeItems: ControlledComponentType[];
    articleTypeFilter: ControlledComponentValueType;
    handleArticleTypeFilter: (value: ControlledComponentValueType) => void;
}) => {
    return (
        <div className={`${styles.desktopContainer} ${styles.localVariables}`}>
            <h3 className={styles.totalItems}>{`${pageTexts.totalResults} ${totalItems}`}</h3>

            <div className={styles.motFiltersContainer}>
                <ToggleGroup
                    items={groupeMotsItems}
                    handleValueChange={handleGroupeMotsFilterChange}
                    value={groupeMotsFilter}
                    className={styles.groupeMotsFilter}
                />
            </div>

            <ToggleGroup
                items={articleTypeItems}
                handleValueChange={handleArticleTypeFilter}
                value={articleTypeFilter}
                className={styles.articleTypeFilter}
            />

            <SelectBox
                items={itemsPerPageOptions}
                value={itemsPerPage}
                handleValueChange={handleItemsPerPageChange}
                changeTriggerColorWhenFiltered={false}
                className={{ trigger: styles.itemsPerPage }}
                createPortal
            />

            <ProjectList projets={paginatedProjects} key={currentPage} className={styles.projectList} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className={styles.pagination}
            />
        </div>
    );
};

const MobileProjectListAndFilters = ({
    totalItems,
    itemsPerPage,
    handleItemsPerPageChange,
    paginatedProjects,
    currentPage,
    totalPages,
    handlePageChange,
    groupeMotsItems,
    groupeMotsFilter,
    handleGroupeMotsFilterChange,
    articleTypeItems,
    articleTypeFilter,
    handleArticleTypeFilter,
}: {
    totalItems: number;
    itemsPerPage: ControlledComponentValueType;
    handleItemsPerPageChange: (numberOfItems: ControlledComponentValueType) => void;
    paginatedProjects: ListProjetsFieldsFragment[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    groupeMotsItems: ControlledComponentType[];
    groupeMotsFilter: ControlledComponentValueType;
    handleGroupeMotsFilterChange: (filter: ControlledComponentValueType) => void;
    articleTypeItems: ControlledComponentType[];
    articleTypeFilter: ControlledComponentValueType;
    handleArticleTypeFilter: (value: ControlledComponentValueType) => void;
}) => {
    return (
        <div className={`${styles.mobileContainer} ${styles.localVariables}`}>
            <h2 className={styles.totalItems}>{`${pageTexts.totalResults} ${totalItems}`}</h2>

            <FilterPopover
                popupContent={
                    <>
                        <ToggleGroup
                            items={articleTypeItems}
                            handleValueChange={handleArticleTypeFilter}
                            value={articleTypeFilter}
                            toggleButtonVariant="text"
                            className={styles.popupItems}
                        />
                        <Separator orientation="horizontal" className={styles.popupSeparator} />
                        <ToggleGroup
                            items={groupeMotsItems}
                            value={groupeMotsFilter}
                            handleValueChange={handleGroupeMotsFilterChange}
                            toggleButtonVariant="text"
                            className={styles.popupItems}
                        />
                    </>
                }
                hasFilterApplied={groupeMotsFilter !== null || articleTypeFilter !== null}
                className={{ trigger: styles.filters }}
            />

            <SelectBox
                items={itemsPerPageOptions}
                value={itemsPerPage}
                handleValueChange={handleItemsPerPageChange}
                changeTriggerColorWhenFiltered={false}
                className={{ trigger: styles.itemsPerPage }}
                createPortal
            />

            <ProjectList projets={paginatedProjects} key={currentPage} className={styles.projectList} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className={styles.pagination}
            />
        </div>
    );
};

export default function ProjectListWrapper({
    projects,
    groupeMotsForFilter,
}: {
    projects: ListProjetsFieldsFragment[];
    groupeMotsForFilter: MotsAndGroupeMotsFieldsFragment[];
}) {
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ControlledComponentValueType>(itemsPerPageOptions[0].value);
    const [groupeMotsFilter, setGroupeMotsFilter] = useState<ControlledComponentValueType>(null);
    const [articleTypeFilter, setArticleTypeFilter] = useState<ControlledComponentValueType>(null);

    const isDesktop: boolean = useIsDesktop();

    const groupeMotsItems: ControlledComponentType[] = [
        { label: 'Tout', value: null } as ControlledComponentType,
        ...groupeMotsForFilter.map(mot => {
            return { label: mot.titre, value: mot.id } as ControlledComponentType;
        }),
    ];

    const itemsPerPageFallback: number = 10;
    const totalPages: number = Math.ceil(filteredProjects.length / ((itemsPerPage as number) ?? itemsPerPageFallback));
    const totalItems: number = filteredProjects.length;
    const paginatedProjects: ListProjetsFieldsFragment[] = filteredProjects.slice(
        (currentPage - 1) * ((itemsPerPage as number) ?? itemsPerPageFallback),
        currentPage * ((itemsPerPage as number) ?? itemsPerPageFallback)
    );

    const filterProjectsByArticleMotId = (
        motId: ControlledComponentValueType,
        baseProjectList: ListProjetsFieldsFragment[]
    ): ListProjetsFieldsFragment[] => {
        return motId === null
            ? baseProjectList
            : baseProjectList
                  .map(rubrique => {
                      const filteredArticles = rubrique?.articles?.result?.filter(article => {
                          const motsFromArticleFragment = getFragmentData(
                              MotsAndGroupeMotsFieldsFragmentDoc,
                              article?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
                          );
                          return motsFromArticleFragment.some(mot => mot?.id === motId);
                      });

                      if (filteredArticles?.length === 0) return null;

                      return {
                          ...rubrique,
                          articles: {
                              ...rubrique.articles,
                              result: filteredArticles,
                          },
                      };
                  })
                  .filter(rubrique => rubrique !== null);
    };

    const filterProjectsByArticleType = (
        articleType: ControlledComponentValueType,
        baseProjectList: ListProjetsFieldsFragment[]
    ): ListProjetsFieldsFragment[] => {
        return articleType === null
            ? baseProjectList
            : baseProjectList
                  .map(rubrique => {
                      const articleInformationFragment = getFragmentData(
                          ArticleFullInformationFieldsFragmentDoc,
                          rubrique.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
                      );

                      const filteredArticles = articleInformationFragment.filter(
                          article => article.isprototype === articleType
                      );

                      if (filteredArticles?.length === 0) return null;

                      return {
                          ...rubrique,
                          articles: {
                              ...rubrique.articles,
                              result: filteredArticles,
                          },
                      };
                  })
                  .filter(rubrique => rubrique !== null);
    };

    const applyMultipleFilters = (
        projectListFilters: ProjectListFilterFunctionType[],
        baseProjectList: ListProjetsFieldsFragment[] = projects
    ): ListProjetsFieldsFragment[] => {
        return projectListFilters.reduce((accumulator, filterFunction) => filterFunction(accumulator), baseProjectList);
    };

    const handleItemsPerPageChange = (numberOfItems: ControlledComponentValueType) => {
        setCurrentPage(1);
        setItemsPerPage(numberOfItems ?? itemsPerPageFallback);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleGroupeMotsFilterChange = (filter: ControlledComponentValueType) => {
        setCurrentPage(1);
        setGroupeMotsFilter(filter);
        setFilteredProjects(
            applyMultipleFilters([
                projectList => filterProjectsByArticleMotId(filter, projectList),
                projectList => filterProjectsByArticleType(articleTypeFilter, projectList),
            ])
        );
    };

    const handleArticleTypeFilter = (filter: ControlledComponentValueType) => {
        setCurrentPage(1);
        setArticleTypeFilter(filter);
        setFilteredProjects(
            applyMultipleFilters([
                projectList => filterProjectsByArticleMotId(groupeMotsFilter, projectList),
                projectList => filterProjectsByArticleType(filter, projectList),
            ])
        );
    };

    return (
        <>
            {isDesktop ? (
                <DesktopProjectListAndFilters
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    paginatedProjects={paginatedProjects}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    groupeMotsItems={groupeMotsItems}
                    groupeMotsFilter={groupeMotsFilter}
                    handleGroupeMotsFilterChange={handleGroupeMotsFilterChange}
                    articleTypeItems={articleTypeOptions}
                    articleTypeFilter={articleTypeFilter}
                    handleArticleTypeFilter={handleArticleTypeFilter}
                />
            ) : (
                <MobileProjectListAndFilters
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    paginatedProjects={paginatedProjects}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    groupeMotsItems={groupeMotsItems}
                    groupeMotsFilter={groupeMotsFilter}
                    handleGroupeMotsFilterChange={handleGroupeMotsFilterChange}
                    articleTypeItems={articleTypeOptions}
                    articleTypeFilter={articleTypeFilter}
                    handleArticleTypeFilter={handleArticleTypeFilter}
                />
            )}
        </>
    );
}
