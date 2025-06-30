'use client';

import { Field, Form, Menu, Popover } from '@base-ui-components/react';
import burgerMenuIcon from '@public/burger-menu-icon.svg';
import closeButtonIcon from '@public/close-button-icon.svg';
import emailIcon from '@public/email-icon.svg';
import erasmeLogo from '@public/erasme-logo.svg';
import searchIcon from '@public/search-icon.svg';
import Backdrop from '@ui/elements/backdrop';
import Button from '@ui/elements/button';
import InputField from '@ui/elements/inputField';
import Loader from '@ui/elements/loader';
import SelectBox from '@ui/elements/selectBox';
import { SearchFilterItem, searchFilterMap } from '@utils/searchUtils';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, RefObject, Suspense, useRef } from 'react';
import styles from './navbar.module.css';
import SearchResults from './searchResults';

const headerLinks = [
    {
        label: 'PROJETS',
        href: '/projets',
    },
    {
        label: 'URBAN LAB',
        href: '/urban-lab',
    },
    {
        label: 'EQUIPE',
        href: '/equipe',
    },
];

const SearchFilter = ({
    filter,
    handleSearchFilterChange,
    isDesktop,
}: {
    filter: SearchFilterItem;
    handleSearchFilterChange: (event: SearchFilterItem) => void;
    isDesktop?: boolean;
}) => {
    return (
        <SelectBox
            className={
                isDesktop
                    ? {
                          trigger: styles.searchFilter,
                          popup: `${styles.overlayContainer} ${styles.localVariables}`,
                      }
                    : {
                          trigger: styles.searchFilter,
                      }
            }
            items={Object.values(searchFilterMap)}
            value={filter}
            handleValueChange={handleSearchFilterChange}
        />
    );
};

const SearchForm = ({
    handleSearchFormSubmit,
    searchInputRef,
}: {
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    searchInputRef?: RefObject<HTMLInputElement | null>;
}) => {
    return (
        <Form onSubmit={handleSearchFormSubmit} style={{ display: 'contents' }}>
            <Field.Root style={{ display: 'contents' }}>
                <InputField
                    type="text"
                    name="searchInput"
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

const MobileNavbarAndSearchMenu = ({
    isSearchMode,
    searchInput,
    searchFilter,
    showSearchResults,
    handleSearchMode,
    handleSearchFormSubmit,
    handleSearchFilterChange,
    mainDivRef,
}: {
    isSearchMode: boolean;
    searchInput: string;
    searchFilter: SearchFilterItem;
    showSearchResults: boolean;
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleSearchFilterChange: (event: SearchFilterItem) => void;
    mainDivRef: RefObject<HTMLDivElement | null>;
}) => {
    return (
        <div className={styles.smallScreenContainer}>
            <Link href="/contact">
                <Button variant="text">
                    <Image src={emailIcon} alt="contact"></Image>
                </Button>
            </Link>

            {/* SEARCH MENU */}
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
                            className={`${styles.localVariables} ${styles.overlayContainer} ${styles.searchMenuContainer}`}
                        >
                            <Popover.Close
                                render={
                                    <Button variant="text" className={styles.closeButton}>
                                        <Image src={closeButtonIcon} alt="fermer menu de recherche"></Image>
                                    </Button>
                                }
                            />

                            <SearchForm handleSearchFormSubmit={handleSearchFormSubmit} />

                            <SearchFilter filter={searchFilter} handleSearchFilterChange={handleSearchFilterChange} />

                            {showSearchResults && (
                                <div className={styles.searchResults}>
                                    <Suspense fallback={<Loader />}>
                                        <SearchResults
                                            searchInput={searchInput}
                                            searchFilter={searchFilter}
                                            handleNavigation={handleSearchMode}
                                        />
                                    </Suspense>
                                </div>
                            )}
                        </Popover.Popup>
                    </Popover.Positioner>
                </Popover.Portal>
            </Popover.Root>

            {/* BURGER MENU */}
            <Menu.Root modal={true}>
                <Menu.Trigger
                    render={
                        <Button variant="filled">
                            <Image src={burgerMenuIcon} alt="liens vers d'autres pages"></Image>
                        </Button>
                    }
                />
                <Menu.Portal>
                    <Menu.Backdrop render={<Backdrop />} />
                    <Menu.Positioner anchor={mainDivRef.current} align="start" side="bottom">
                        <Menu.Popup
                            className={`${styles.localVariables} ${styles.overlayContainer} ${styles.burgerMenuContainer}`}
                        >
                            <Menu.Item
                                render={
                                    <Button variant="text">
                                        <Image src={closeButtonIcon} alt="fermer menu des liens"></Image>
                                    </Button>
                                }
                            />

                            {headerLinks.map((link, index) => (
                                <Menu.Item
                                    key={index}
                                    render={
                                        <Link href={link.href}>
                                            <Button variant="text">{link.label}</Button>
                                        </Link>
                                    }
                                />
                            ))}
                        </Menu.Popup>
                    </Menu.Positioner>
                </Menu.Portal>
            </Menu.Root>
        </div>
    );
};

const DesktopNavbarAndSearchMenu = ({
    isSearchMode,
    searchInput,
    searchFilter,
    showSearchResults,
    handleSearchMode,
    handleSearchFormSubmit,
    handleSearchFilterChange,
    handleNavigation,
    mainDivRef,
}: {
    isSearchMode: boolean;
    searchInput: string;
    searchFilter: SearchFilterItem;
    showSearchResults: boolean;
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleSearchFilterChange: (event: SearchFilterItem) => void;
    handleNavigation: () => void;
    mainDivRef: RefObject<HTMLDivElement | null>;
}) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.bigScreenContainer}>
            {isSearchMode ? (
                <>
                    <div className={styles.searchMenuContainer}>
                        <SearchForm handleSearchFormSubmit={handleSearchFormSubmit} searchInputRef={searchInputRef} />

                        <SearchFilter
                            isDesktop
                            filter={searchFilter}
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
                                            className={`${styles.overlayContainer} ${styles.localVariables} ${styles.desktopSearchResultsContainer}`}
                                        >
                                            <Suspense fallback={<Loader />}>
                                                <SearchResults
                                                    searchInput={searchInput}
                                                    searchFilter={searchFilter}
                                                    handleNavigation={handleNavigation}
                                                />
                                            </Suspense>
                                        </Popover.Popup>
                                    </Popover.Positioner>
                                </Popover.Portal>
                            </Popover.Root>
                        ) : (
                            <Popover.Root open={!showSearchResults}>
                                <Popover.Portal>
                                    <Popover.Positioner anchor={searchInputRef} align="start" side="bottom">
                                        <Popover.Popup
                                            className={`${styles.overlayContainer} ${styles.localVariables} ${styles.verticalOffset}`}
                                            initialFocus={searchInputRef}
                                        >
                                            TODO: IMPLEMENT SEARCH SUGGESTIONS
                                        </Popover.Popup>
                                    </Popover.Positioner>
                                </Popover.Portal>
                            </Popover.Root>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.mainNavigationContainer}>
                        {headerLinks.map((link, index) => (
                            <Link href={link.href} key={index} onNavigate={handleNavigation}>
                                <Button variant="text">{link.label}</Button>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.mainNavigationContainer}>
                        <Button variant="ghost" onClick={handleSearchMode}>
                            <Image src={searchIcon} alt="activer mode recherche"></Image>
                        </Button>

                        <Link href="/contact" onNavigate={handleNavigation}>
                            <Button variant="filled">CONTACT</Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

type NavbarProps = {
    isDesktop: boolean;
    isSearchMode: boolean;
    searchInput: string;
    searchFilter: SearchFilterItem;
    showSearchResults: boolean;
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleSearchFilterChange: (event: SearchFilterItem) => void;
    handleNavigation: () => void;
};

export default function Navbar({
    isDesktop,
    isSearchMode,
    searchInput,
    searchFilter,
    showSearchResults,
    handleSearchMode,
    handleSearchFormSubmit,
    handleSearchFilterChange,
    handleNavigation,
}: NavbarProps) {
    /**
     * TODO:
     * - Implement search suggestions
     * - Remove magic strings
     */

    const mainDivRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <header
                ref={mainDivRef}
                className={`${styles.mainContainer} ${styles.positioning} ${styles.zIndex} ${styles.localVariables}`}
            >
                <Link href="/" onNavigate={handleNavigation}>
                    <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />
                </Link>

                {isDesktop ? (
                    <DesktopNavbarAndSearchMenu
                        isSearchMode={isSearchMode}
                        searchInput={searchInput}
                        searchFilter={searchFilter}
                        showSearchResults={showSearchResults}
                        handleSearchMode={handleSearchMode}
                        handleSearchFormSubmit={handleSearchFormSubmit}
                        handleSearchFilterChange={handleSearchFilterChange}
                        handleNavigation={handleNavigation}
                        mainDivRef={mainDivRef}
                    />
                ) : (
                    <MobileNavbarAndSearchMenu
                        isSearchMode={isSearchMode}
                        searchInput={searchInput}
                        searchFilter={searchFilter}
                        showSearchResults={showSearchResults}
                        handleSearchMode={handleSearchMode}
                        handleSearchFormSubmit={handleSearchFormSubmit}
                        handleSearchFilterChange={handleSearchFilterChange}
                        mainDivRef={mainDivRef}
                    />
                )}
            </header>
        </>
    );
}
