'use client';

import blueskyIcon from '@public/bluesky-icon.svg';
import erasmeLogo from '@public/erasme-logo.svg';
import flickrIcon from '@public/flickr-icon.svg';
import humanIcon from '@public/human-icon.svg';
import linkedinIcon from '@public/linkedin-icon.svg';
import mastodonIcon from '@public/mastodon-icon.svg';
import metropoleLyonLogo from '@public/metropole_lyon-logo.svg';
import youtubeIcon from '@public/youtube-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './footer.module.css';

const footerLinks = [
    {
        label: 'CONTACT',
        href: '/contact',
    },
    {
        label: 'MENTIONS LÉGALES',
        href: '/mentions-legales',
    },
    {
        label: 'ACCESSIBILITÉ',
        href: '/accessibilite',
    },
];

const socialMediaLinks = [
    {
        label: 'youtube',
        href: 'https://www.youtube.com/channel/UC6DBR8YbGdgHRLgRG2XqjeA',
        icon: youtubeIcon,
        alt: 'Logo YouTube',
    },
    {
        label: 'linkedin',
        href: 'https://www.linkedin.com/company/erasme-urbanlab',
        icon: linkedinIcon,
        alt: 'Logo LinkedIn',
    },
    {
        label: 'bluesky',
        href: 'https://bsky.app/profile/urbanlaberasme.bsky.social',
        icon: blueskyIcon,
        alt: 'Logo Bluesky',
    },
    {
        label: 'mastodon',
        href: 'https://piaille.fr/@erasme',
        icon: mastodonIcon,
        alt: 'Logo Mastodon',
    },
    {
        label: 'flickr',
        href: 'https://www.flickr.com/photos/erasme/',
        icon: flickrIcon,
        alt: 'Logo Flickr',
    },
];

const metropoleLyonLink = {
    href: 'https://www.grandlyon.com/',
    icon: metropoleLyonLogo,
    alt: 'Logo Métropole de Lyon',
};

export default function Footer({className}: {className?: string}) {
    const pathname = usePathname();

    return (
        <footer className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            <ul className={`${styles.secondaryContainer} ${styles.internalLinks}`}>
                <li key="cookie">
                    <a className={styles.footerLink} href="" data-cc="show-preferencesModal">
                        COOKIES
                    </a>
                </li>
                {footerLinks.map(link => {
                    return (
                        <li key={link.label}>
                            <Link
                                className={`${styles.footerLink} ${pathname === link.href ? styles.isActivePage : ''}`}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
                <li key="se-connecter">
                    <a href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ecrire`} target='_blank' className={styles.footerLink}>
                        SE CONNECTER
                    </a>
                </li>
            </ul>
            <Image className={styles.conditionalDisplay} src={humanIcon} alt="" />
            <div className={`${styles.secondaryContainer} ${styles.externalLinks}`}>
                <div className={styles.logosContainer}>
                    <Image src={erasmeLogo} alt="Logo Erasme" className={styles.erasmeLogo} />
                    <Link href={metropoleLyonLink.href} target="_blank">
                        <Image
                            src={metropoleLyonLink.icon}
                            alt={metropoleLyonLink.alt}
                            className={styles.metropoleLyonLogo}
                        />
                    </Link>
                </div>
                <ul className={styles.socialMediaContainer}>
                    {socialMediaLinks.map(socialMedia => {
                        return (
                            <li key={socialMedia.label}>
                                <Link href={socialMedia.href} target="_blank">
                                    <Image src={socialMedia.icon} alt={socialMedia.alt} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className={styles.copyrights}>© 2025</p>
            </div>
        </footer>
    );
}
