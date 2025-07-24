import '@globals/styles.css';
import { ApolloWrapper } from '@services/apollo/apolloWrapper';
import { CookieConsentManager } from '@services/cookieConsent/cookieConsentManager';
import Footer from '@ui/components/footer';
import NavbarWrapper from '@ui/components/navbarWrapper';
import NavigateBack from '@ui/components/navigateBack';
import type { Metadata } from 'next';
import { K2D } from 'next/font/google';
import styles from './layout.module.css';

export const metadata: Metadata = {
    title: 'ERASME',
    description: "Siteweb d'Erasme",
};

const k2d = K2D({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'latin-ext'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={k2d.className}>
            <body className={styles.bodyWrapper}>
                <CookieConsentManager />

                <ApolloWrapper>
                    <NavbarWrapper className={styles.navbar} />
                    <NavigateBack className={styles.navigateBack} />
                    <div className={styles.contentContainer}>{children}</div>
                    <Footer className={styles.footer}/>
                </ApolloWrapper>
            </body>
        </html>
    );
}
