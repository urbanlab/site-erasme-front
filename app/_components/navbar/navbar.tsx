'use client';

import styles from './navbar.module.css';
import Image from 'next/image';
import erasmeLogo from '@public/erasme-logo.svg';
import Button from '@components/button';
import emailIcon from '@public/email-icon.svg';
import searchIcon from '@public/search-icon.svg';
import burgerMenuIcon from '@public/burger-menu-icon.svg';
import closeButtonIcon from '@public/close-button-icon.svg';
import { useRef } from 'react';
import Link from 'next/link';
import { Menu } from '@base-ui-components/react';
import Backdrop from '@components/backdrop';

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

export default function Navbar() {
    const anchorRef = useRef<HTMLDivElement>(null);

    const onBurgerMenuClick = () => {
        console.log('burger menu clicked');
    };

    return (
        <>
            <div ref={anchorRef} className={`${styles.mainContainer} ${styles.positioning} ${styles.localVariables}`}>
                <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />

                <div className={styles.smallScreenButtonsContainer}>
                    <Button variant="text">
                        <Image src={emailIcon} alt="contact"></Image>
                    </Button>
                    <Button variant="text">
                        <Image src={searchIcon} alt="search"></Image>
                    </Button>

                    {/* BURGER MENU */}
                    <Menu.Root onOpenChange={onBurgerMenuClick} modal={true}>
                        <Menu.Trigger
                            render={
                                <Button variant="filled">
                                    <Image src={burgerMenuIcon} alt="links"></Image>
                                </Button>
                            }
                        />
                        <Menu.Portal>
                            <Menu.Backdrop render={<Backdrop />} />
                            <Menu.Positioner anchor={anchorRef.current} align="start" side="bottom">
                                <Menu.Popup
                                    className={`${styles.localVariables} ${styles.overlayContainer} ${styles.burgerMenuContainer}`}
                                >
                                    <Menu.Item>
                                        <Button variant="text">
                                            <Image src={closeButtonIcon} alt="close menu"></Image>
                                        </Button>
                                    </Menu.Item>
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

                <div className={styles.bigScreenButtonsContainer}>
                    <div className={styles.secondaryContainer}>
                        {headerLinks.map((link, index) => (
                            <Link href={link.href} key={index}>
                                <Button variant="text">{link.label}</Button>
                            </Link>
                        ))}
                    </div>
                    <div className={styles.secondaryContainer}>
                        <Button variant="ghost">
                            <Image src={searchIcon} alt="search"></Image>
                        </Button>

                        <Button variant="filled">
                            CONTACT
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
