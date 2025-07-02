'use client';

import { ControlledComponentType, ControlledComponentValueType } from '@globals/types';
import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import { ListProjetsFieldsFragment, MotFieldsFragment, MotFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { useIsDesktop } from '@hooks/useIsDesktop';
import RubriqueProjetsAccordion from '@ui/components/rubriqueProjetsAccordion';
import Pagination from '@ui/elements/pagination';
import SelectBox from '@ui/elements/selectBox';
import ToggleGroup from '@ui/elements/toggleGroup';
import { useState } from 'react';
import styles from './projectListWrapper.module.css';

const itemsPerPageOptions: ControlledComponentType[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
];

const DesktopProjectListAndFilters = ({
    totalItems,
    itemsPerPage,
    handleItemsPerPageChange,
    paginatedProjects,
    currentPage,
    totalPages,
    handlePageChange,
    politiquesPubliquesItems,
    politiquesPubliquesFilter,
    handlePolitiquesPubliquesFilterChange,
}: {
    totalItems: number;
    itemsPerPage: ControlledComponentValueType;
    handleItemsPerPageChange: (numberOfItems: ControlledComponentValueType) => void;
    paginatedProjects: ListProjetsFieldsFragment[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    politiquesPubliquesItems: ControlledComponentType[];
    politiquesPubliquesFilter: ControlledComponentValueType;
    handlePolitiquesPubliquesFilterChange: (value: ControlledComponentValueType) => void;
}) => {
    return (
        <div className={`${styles.desktopContainer} ${styles.localVariables}`}>
            <div className={styles.filtersContainer}>
                <ToggleGroup
                    items={politiquesPubliquesItems}
                    handleValueChange={handlePolitiquesPubliquesFilterChange}
                    value={politiquesPubliquesFilter}
                    className={styles.politiquesPubliquesFilter}
                />
            </div>

            <div className={styles.tableContainer}>
                <h2 className={styles.totalItems}>{`Total : ${totalItems}`}</h2>
                <SelectBox
                    items={itemsPerPageOptions}
                    value={itemsPerPage}
                    handleValueChange={handleItemsPerPageChange}
                    className={{ trigger: styles.itemsPerPage }}
                    createPortal
                />
                <RubriqueProjetsAccordion
                    projets={paginatedProjects}
                    key={currentPage}
                    className={styles.projectList}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className={styles.pagination}
                />
            </div>
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
    politiquesPubliquesItems,
    politiquesPubliquesFilter,
    handlePolitiquesPubliquesFilterChange,
}: {
    totalItems: number;
    itemsPerPage: ControlledComponentValueType;
    handleItemsPerPageChange: (numberOfItems: ControlledComponentValueType) => void;
    paginatedProjects: ListProjetsFieldsFragment[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    politiquesPubliquesItems: ControlledComponentType[];
    politiquesPubliquesFilter: ControlledComponentValueType;
    handlePolitiquesPubliquesFilterChange: (filter: ControlledComponentValueType) => void;
}) => {
    return (
        <div className={`${styles.mobileContainer} ${styles.localVariables}`}>
            <h2 className={styles.totalItems}>{`Total : ${totalItems}`}</h2>
            <SelectBox
                items={politiquesPubliquesItems}
                value={politiquesPubliquesFilter}
                handleValueChange={handlePolitiquesPubliquesFilterChange}
                className={{ trigger: styles.politiquesPubliquesFilter }}
            />
            <SelectBox
                items={itemsPerPageOptions}
                value={itemsPerPage}
                handleValueChange={handleItemsPerPageChange}
                className={{ trigger: styles.itemsPerPage }}
            />
            <RubriqueProjetsAccordion projets={paginatedProjects} key={currentPage} className={styles.projectList} />
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
    politiquesPubliquesMots,
}: {
    projects: ListProjetsFieldsFragment[];
    politiquesPubliquesMots: MotFieldsFragment[];
}) {
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ControlledComponentValueType>(itemsPerPageOptions[0].value);
    const [politiquesPubliquesFilter, setPolitiquesPubliquesFilter] = useState<ControlledComponentValueType>(null);

    const isDesktop: boolean = useIsDesktop();

    const politiquesPubliquesItems: ControlledComponentType[] = [
        { label: 'Tout', value: null } as ControlledComponentType,
        ...politiquesPubliquesMots.map(mot => {
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

    const filterProjectsByArticleMotId = (motId: ControlledComponentValueType): ListProjetsFieldsFragment[] => {
        return motId === null
            ? projects
            : projects
                  .map(rubrique => {
                      const filteredArticles = rubrique?.articles?.result?.filter(article => {
                          const motsFromArticleFragment = getFragmentData(
                              MotFieldsFragmentDoc,
                              article?.mots?.result as FragmentType<typeof MotFieldsFragmentDoc>[]
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

    const handleItemsPerPageChange = (numberOfItems: ControlledComponentValueType) => {
        setCurrentPage(1);
        setItemsPerPage(numberOfItems ?? itemsPerPageFallback);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePolitiquesPubliquesFilterChange = (filter: ControlledComponentValueType) => {
        setCurrentPage(1);
        setPolitiquesPubliquesFilter(filter);

        setFilteredProjects(filterProjectsByArticleMotId(filter));
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
                    politiquesPubliquesItems={politiquesPubliquesItems}
                    politiquesPubliquesFilter={politiquesPubliquesFilter}
                    handlePolitiquesPubliquesFilterChange={handlePolitiquesPubliquesFilterChange}
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
                    politiquesPubliquesItems={politiquesPubliquesItems}
                    politiquesPubliquesFilter={politiquesPubliquesFilter}
                    handlePolitiquesPubliquesFilterChange={handlePolitiquesPubliquesFilterChange}
                />
            )}
        </>
    );
}
