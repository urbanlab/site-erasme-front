'use client';

import { Popover } from '@base-ui-components/react';
import Backdrop from '@components/backdrop';
import Button from '@components/button';
import InputField from '@components/inputField';
import SelectBox from '@components/selectBox';
import burgerMenuIcon from '@public/burger-menu-icon.svg';
import closeButtonIcon from '@public/close-button-icon.svg';
import emailIcon from '@public/email-icon.svg';
import erasmeLogo from '@public/erasme-logo.svg';
import searchIcon from '@public/search-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styles from './navbar.module.css';

const headerLinks = [
    {
        label: 'PROJETS',
        href: '/projets',
    },
    {
        label: 'PROTOTYPES',
        href: '/prototypes',
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

const typeFilters = [
    {
        label: 'Tout',
        value: 'tout',
    },
    {
        label: 'Article',
        value: 'article',
    },
    {
        label: 'Brève',
        value: 'brève',
    },
    {
        label: 'Image',
        value: 'image',
    },
    {
        label: 'Document',
        value: 'document',
    },
];

type NavbarProps = {
    isSearchMode?: boolean;
    handleSearchMode: () => void;
};

export default function Navbar({ isSearchMode, handleSearchMode }: NavbarProps) {
    /**
     * TODO:
     * - Implement forms for search filters
     * - Implement search suggestions
     * - Remove magic strings
     * - Refacto the code, using smaller components/modules
     */

    const mainDivRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const onBurgerMenuClick = () => {
        console.log('burger menu clicked');
    };

    return (
        <>
            <div
                ref={mainDivRef}
                className={`${styles.mainContainer} ${styles.positioning} ${styles.zIndex} ${styles.localVariables}`}
            >
                <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />

                {/* SMALL SCREENS ONLY */}
                <div className={styles.smallScreenContainer}>
                    <Button variant="text">
                        <Image src={emailIcon} alt="contact"></Image>
                    </Button>

                    {/* SEARCH MENU */}
                    <Popover.Root onOpenChange={onBurgerMenuClick} modal={true}>
                        <Popover.Trigger
                            render={
                                <Button variant="text">
                                    <Image src={searchIcon} alt="search"></Image>
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
                                                <Image src={closeButtonIcon} alt="close menu"></Image>
                                            </Button>
                                        }
                                    />

                                    <InputField type="text" autoFocus className={styles.searchInput} />

                                    {/* SEARCH FILTER */}
                                    <SelectBox
                                        className={{ trigger: styles.filterButton }}
                                        items={typeFilters}
                                    />

                                    <Button variant="filled" className={styles.searchButton}>
                                        Rechercher
                                    </Button>

                                    <div className={styles.searchResults}>CECI EST LE RESULTAT DE LA RECHERCHE</div>
                                </Popover.Popup>
                            </Popover.Positioner>
                        </Popover.Portal>
                    </Popover.Root>

                    {/* BURGER MENU */}
                    <Popover.Root onOpenChange={onBurgerMenuClick} modal={true}>
                        <Popover.Trigger
                            render={
                                <Button variant="filled">
                                    <Image src={burgerMenuIcon} alt="links"></Image>
                                </Button>
                            }
                        />
                        <Popover.Portal>
                            <Popover.Backdrop render={<Backdrop />} />
                            <Popover.Positioner anchor={mainDivRef.current} align="start" side="bottom">
                                <Popover.Popup
                                    className={`${styles.localVariables} ${styles.overlayContainer} ${styles.burgerMenuContainer}`}
                                >
                                    <Popover.Close
                                        render={
                                            <Button variant="text">
                                                <Image src={closeButtonIcon} alt="close menu"></Image>
                                            </Button>
                                        }
                                    />

                                    {headerLinks.map((link, index) => (
                                        <Link href={link.href} key={index}>
                                            <Button variant="text">{link.label}</Button>
                                        </Link>
                                    ))}
                                </Popover.Popup>
                            </Popover.Positioner>
                        </Popover.Portal>
                    </Popover.Root>
                </div>

                {/* BIG SCREENS ONLY */}
                <div className={styles.bigScreenContainer}>
                    {isSearchMode ? (
                        <>
                            <div className={styles.secondaryContainer}>
                                {/* SEARCH FILTER */}
                                <SelectBox
                                    className={{
                                        trigger: styles.filterButton,
                                        popup: `${styles.overlayContainer} ${styles.localVariables}`,
                                    }}
                                    items={typeFilters}
                                />

                                <InputField type="text" ref={searchInputRef} autoFocus />
                                <Button variant="filled">Rechercher</Button>
                                <Button variant="ghost" onClick={handleSearchMode}>
                                    Fermer
                                </Button>

                                {/* SEARCH SUGGESTIONS */}
                                <Popover.Root open={isSearchMode}>
                                    <Popover.Portal>
                                        <Popover.Positioner anchor={searchInputRef} align="start" side="bottom">
                                            <Popover.Popup
                                                className={`${styles.overlayContainer} ${styles.localVariables}`}
                                                initialFocus={searchInputRef}
                                            >
                                                TODO: IMPLEMENT SEARCH SUGGESTIONS
                                            </Popover.Popup>
                                        </Popover.Positioner>
                                    </Popover.Portal>
                                </Popover.Root>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.secondaryContainer}>
                                {headerLinks.map((link, index) => (
                                    <Link href={link.href} key={index}>
                                        <Button variant="text">{link.label}</Button>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.secondaryContainer}>
                                <Button variant="ghost" onClick={handleSearchMode}>
                                    <Image src={searchIcon} alt="search"></Image>
                                </Button>

                                <Button variant="filled">CONTACT</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
