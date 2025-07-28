'use client';

import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import { Popover } from '@base-ui-components/react/popover';
import { ControlledComponentValueType } from '@globals/types';
import closeButtonIcon from '@public/close-button-icon.svg';
import searchIcon from '@public/search-icon.svg';
import Backdrop from '@ui/components/backdrop';
import Button from '@ui/components/button';
import InputField from '@ui/components/inputField';
import Loader from '@ui/components/loader';
import SelectBox from '@ui/components/selectBox';
import { searchFilterMap } from '@utils/searchUtils';
import Image from 'next/image';
import { FormEvent, RefObject, Suspense, useRef } from 'react';
import navbarStyles from '../_navbar/navbar.module.css';
import SearchResults from '../_searchResults/searchResults';
import styles from './searchMenu.module.css';

const SearchFilter = ({
    selectedSearchFilter,
    handleSearchFilterChange,
    isDesktop,
}: {
    selectedSearchFilter: ControlledComponentValueType;
    handleSearchFilterChange: (searchFilter: ControlledComponentValueType) => void;
    isDesktop?: boolean;
}) => {
    return (
        <SelectBox
            className={
                isDesktop
                    ? {
                          trigger: styles.searchFilter,
                          popup: `${navbarStyles.overlayContainer} ${navbarStyles.localVariables}`,
                      }
                    : {
                          trigger: styles.searchFilter,
                      }
            }
            items={Object.values(searchFilterMap)}
            value={selectedSearchFilter}
            handleValueChange={handleSearchFilterChange}
        />
    );
};

const SearchForm = ({
    handleSearchFormSubmit,
    searchInputRef,
    searchFormRef,
}: {
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    searchInputRef?: RefObject<HTMLInputElement | null>;
    searchFormRef?: RefObject<HTMLFormElement | null>;
}) => {
    return (
        <Form onSubmit={handleSearchFormSubmit} ref={searchFormRef} style={{ display: 'contents' }}>
            <Field.Root name="searchInput" style={{ display: 'contents' }}>
                <InputField
                    type="text"
                    name="searchInput"
                    aria-label="texte pour la recherche"
                    autoFocus
                    required
                    ref={searchInputRef}
                    className={styles.searchInput}
                />
            </Field.Root>

            <Button type="submit" variant="filled" className={styles.searchButton}>
                Rechercher
            </Button>
        </Form>
    );
};

const SearchSuggestions = ({
    searchSuggestions,
    handleSelectSearchSuggestion,
    handleRemoveSearchSuggestion,
}: {
    searchSuggestions: string[];
    handleSelectSearchSuggestion: (selectedSuggestion: string) => void;
    handleRemoveSearchSuggestion: (suggestionToRemove: string) => void;
}) => {
    return (
        <ul>
            {searchSuggestions?.map((suggestion, index) => {
                return (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="text" onClick={() => handleSelectSearchSuggestion(suggestion)}>
                            {suggestion}
                        </Button>
                        <Button
                            aria-label="supprimer suggestion de la liste"
                            type="reset"
                            variant="no-style"
                            onClick={() => handleRemoveSearchSuggestion(suggestion)}
                        >
                            x
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};

const DesktopSearchMenu = ({
    searchInput,
    selectedSearchFilter,
    showSearchResults,
    searchSuggestions,
    handleSearchMode,
    handleSearchFormSubmit,
    handleNavigation,
    handleSearchFilterChange,
    handleRemoveSearchSuggestion,
    mainDivRef,
}: {
    searchInput: string;
    selectedSearchFilter: ControlledComponentValueType;
    showSearchResults: boolean;
    searchSuggestions: string[];
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleNavigation: () => void;
    handleSearchFilterChange: (searchFilter: ControlledComponentValueType) => void;
    handleRemoveSearchSuggestion: (suggestionToRemove: string) => void;
    mainDivRef: RefObject<HTMLDivElement | null>;
}) => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchFormRef = useRef<HTMLFormElement>(null);

    const handleSelectSearchSuggestion = (selectedSuggestion: string) => {
        if (searchInputRef.current) {
            searchInputRef.current.value = selectedSuggestion;
        }

        if (searchFormRef.current) {
            //this will automatically invoke `handleSearchFormSubmit`
            searchFormRef.current.requestSubmit();
        }
    };
    return (
        <div className={styles.searchMenuContainer}>
            <SearchForm
                handleSearchFormSubmit={handleSearchFormSubmit}
                searchInputRef={searchInputRef}
                searchFormRef={searchFormRef}
            />

            <SearchFilter
                isDesktop
                selectedSearchFilter={selectedSearchFilter}
                handleSearchFilterChange={handleSearchFilterChange}
            />

            <Button variant="ghost" onClick={handleSearchMode}>
                Fermer
            </Button>

            {/* SEARCH SUGGESTIONS */}
            {showSearchResults ? (
                <Popover.Root open={showSearchResults}>
                    <Popover.Portal>
                        <Popover.Positioner anchor={mainDivRef} align="start" side="bottom">
                            <Popover.Popup
                                className={`${navbarStyles.overlayContainer} ${navbarStyles.localVariables} ${styles.desktopSearchResultsContainer}`}
                            >
                                <Suspense fallback={<Loader />}>
                                    <SearchResults
                                        searchInput={searchInput}
                                        searchFilter={selectedSearchFilter}
                                        handleNavigation={handleNavigation}
                                    />
                                </Suspense>
                            </Popover.Popup>
                        </Popover.Positioner>
                    </Popover.Portal>
                </Popover.Root>
            ) : (
                <Popover.Root open={!showSearchResults && searchSuggestions.length > 0}>
                    <Popover.Portal>
                        <Popover.Positioner anchor={searchInputRef} align="start" side="bottom">
                            <Popover.Popup
                                className={`${navbarStyles.overlayContainer} ${navbarStyles.localVariables} ${styles.verticalOffset}`}
                                initialFocus={searchInputRef}
                            >
                                <SearchSuggestions
                                    searchSuggestions={searchSuggestions}
                                    handleSelectSearchSuggestion={handleSelectSearchSuggestion}
                                    handleRemoveSearchSuggestion={handleRemoveSearchSuggestion}
                                />
                            </Popover.Popup>
                        </Popover.Positioner>
                    </Popover.Portal>
                </Popover.Root>
            )}
        </div>
    );
};

const MobileSearchMenu = ({
    isSearchMode,
    searchInput,
    selectedSearchFilter,
    showSearchResults,
    handleSearchMode,
    handleSearchFormSubmit,
    handleSearchFilterChange,
    mainDivRef,
}: {
    isSearchMode: boolean;
    searchInput: string;
    selectedSearchFilter: ControlledComponentValueType;
    showSearchResults: boolean;
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleSearchFilterChange: (searchFilter: ControlledComponentValueType) => void;
    mainDivRef: RefObject<HTMLDivElement | null>;
}) => {
    return (
        <Popover.Root modal={true} open={isSearchMode} onOpenChange={handleSearchMode}>
            <Popover.Trigger
                render={
                    <Button variant="text">
                        <Image src={searchIcon} alt="menu de recherche"></Image>
                    </Button>
                }
            />
            <Popover.Portal>
                <Popover.Backdrop render={<Backdrop />} />
                <Popover.Positioner anchor={mainDivRef.current} align="start" side="bottom">
                    <Popover.Popup
                        className={`${navbarStyles.localVariables} ${navbarStyles.overlayContainer} ${styles.searchMenuContainer}`}
                    >
                        <Popover.Close
                            render={
                                <Button variant="text" className={styles.closeButton}>
                                    <Image src={closeButtonIcon} alt="fermer menu de recherche"></Image>
                                </Button>
                            }
                        />

                        <SearchForm handleSearchFormSubmit={handleSearchFormSubmit} />

                        <SearchFilter
                            selectedSearchFilter={selectedSearchFilter}
                            handleSearchFilterChange={handleSearchFilterChange}
                        />

                        {showSearchResults && (
                            <div className={styles.searchResults}>
                                <Suspense fallback={<Loader />}>
                                    <SearchResults
                                        searchInput={searchInput}
                                        searchFilter={selectedSearchFilter}
                                        handleNavigation={handleSearchMode}
                                    />
                                </Suspense>
                            </div>
                        )}
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
};

export { DesktopSearchMenu, MobileSearchMenu };
