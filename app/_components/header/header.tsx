'use client';

import styles from './header.module.css';
import Image from 'next/image';
import erasmeLogo from '@public/erasme-logo.svg';
import Button from '@components/button';
import emailIcon from '@public/email-icon.svg';
import searchIcon from '@public/search-icon.svg';
import burgerMenuIcon from '@public/burger-menu-icon.svg';
import { useState } from 'react';

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

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={`${styles.mainContainer} ${styles.positioning} ${styles.localVariables}`}>
                <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />

                <div className={styles.smallScreenButtonsContainer}>
                    <Button variant="text">
                        <Image src={emailIcon} alt="contact"></Image>
                    </Button>
                    <Button variant="text">
                        <Image src={searchIcon} alt="search"></Image>
                    </Button>
                    <Button variant="filled" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Image src={burgerMenuIcon} alt="links"></Image>
                    </Button>
                </div>

                <div className={styles.bigScreenButtonsContainer}>
                    <div className={styles.secondaryContainer}>
                        {headerLinks.map((link, index) => (
                            <Button variant="text" key={index}>
                                {link.label}
                            </Button>
                        ))}
                    </div>
                    <div className={styles.secondaryContainer}>
                        <Button variant="ghost">
                            <Image src={searchIcon} alt="search"></Image>
                        </Button>
                        <Button variant="filled">CONTACT</Button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className={styles.smallScreenLinksContainer}>
                    {headerLinks.map((link, index) => (
                        <Button variant="text" key={index}>
                            {link.label}
                        </Button>
                    ))}
                </div>
            )}
        </>
    );
}
