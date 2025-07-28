'use client';

import { Menu } from '@base-ui-components/react';
import { ControlledComponentValueType } from '@globals/types';
import burgerMenuIcon from '@public/burger-menu-icon.svg';
import closeButtonIcon from '@public/close-button-icon.svg';
import emailIcon from '@public/email-icon.svg';
import erasmeLogo from '@public/erasme-logo.svg';
import searchIcon from '@public/search-icon.svg';
import Backdrop from '@ui/components/backdrop';
import Button from '@ui/components/button';
import LinkButton from '@ui/components/linkButton';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, RefObject, useRef } from 'react';
import { DesktopSearchMenu, MobileSearchMenu } from '../_searchMenu/searchMenu';
import styles from './navbar.module.css';

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

const MobileNavbar = ({
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
    const pathname = usePathname();

    return (
        <div className={styles.smallScreenContainer}>
            <LinkButton href="/contact" variant="text">
                <Image src={emailIcon} alt="contact"></Image>
            </LinkButton>

            {/* SEARCH MENU */}

            <MobileSearchMenu
                isSearchMode={isSearchMode}
                searchInput={searchInput}
                selectedSearchFilter={selectedSearchFilter}
                showSearchResults={showSearchResults}
                handleSearchMode={handleSearchMode}
                handleSearchFormSubmit={handleSearchFormSubmit}
                handleSearchFilterChange={handleSearchFilterChange}
                mainDivRef={mainDivRef}
            />

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
                                        <LinkButton
                                            href={link.href}
                                            variant="text"
                                            className={pathname === link.href ? styles.isActivePage : ''}
                                        >
                                            {link.label}
                                        </LinkButton>
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

const DesktopNavbar = ({
    isSearchMode,
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
    isSearchMode: boolean;
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
    const pathname = usePathname();

    return (
        <div className={styles.bigScreenContainer}>
            {isSearchMode ? (
                <>
                    <DesktopSearchMenu
                        searchInput={searchInput}
                        selectedSearchFilter={selectedSearchFilter}
                        showSearchResults={showSearchResults}
                        searchSuggestions={searchSuggestions}
                        handleSearchMode={handleSearchMode}
                        handleSearchFormSubmit={handleSearchFormSubmit}
                        handleNavigation={handleNavigation}
                        handleSearchFilterChange={handleSearchFilterChange}
                        handleRemoveSearchSuggestion={handleRemoveSearchSuggestion}
                        mainDivRef={mainDivRef}
                    />
                </>
            ) : (
                <>
                    <div className={styles.mainNavigationContainer}>
                        {headerLinks.map((link, index) => (
                            <LinkButton
                                href={link.href}
                                key={index}
                                onNavigate={handleNavigation}
                                variant="text"
                                className={pathname === link.href ? styles.isActivePage : ''}
                            >
                                {link.label}
                            </LinkButton>
                        ))}
                    </div>

                    <div className={styles.mainNavigationContainer}>
                        <Button variant="ghost" onClick={handleSearchMode}>
                            <Image src={searchIcon} alt="activer mode recherche"></Image>
                        </Button>

                        <LinkButton href="/contact" onNavigate={handleNavigation} variant="filled">
                            CONTACT
                        </LinkButton>
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
    selectedSearchFilter: ControlledComponentValueType;
    showSearchResults: boolean;
    searchSuggestions: string[];
    handleSearchMode: () => void;
    handleSearchFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleNavigation: () => void;
    handleSearchFilterChange: (searchFilter: ControlledComponentValueType) => void;
    handleRemoveSearchSuggestion: (suggestionToRemove: string) => void;
    className?: string;
};

export default function Navbar({
    isDesktop,
    isSearchMode,
    searchInput,
    selectedSearchFilter,
    showSearchResults,
    searchSuggestions,
    handleSearchMode,
    handleNavigation,
    handleSearchFormSubmit,
    handleSearchFilterChange,
    handleRemoveSearchSuggestion,
    className,
}: NavbarProps) {
    const mainDivRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <header
                ref={mainDivRef}
                className={`${styles.mainContainer} ${styles.positioning} ${styles.zIndex} ${styles.localVariables} ${className}`}
            >
                <Link href="/" onNavigate={handleNavigation}>
                    <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />
                </Link>

                {isDesktop ? (
                    <DesktopNavbar
                        isSearchMode={isSearchMode}
                        searchInput={searchInput}
                        selectedSearchFilter={selectedSearchFilter}
                        showSearchResults={showSearchResults}
                        searchSuggestions={searchSuggestions}
                        handleSearchMode={handleSearchMode}
                        handleSearchFormSubmit={handleSearchFormSubmit}
                        handleNavigation={handleNavigation}
                        handleSearchFilterChange={handleSearchFilterChange}
                        handleRemoveSearchSuggestion={handleRemoveSearchSuggestion}
                        mainDivRef={mainDivRef}
                    />
                ) : (
                    <MobileNavbar
                        isSearchMode={isSearchMode}
                        searchInput={searchInput}
                        selectedSearchFilter={selectedSearchFilter}
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
