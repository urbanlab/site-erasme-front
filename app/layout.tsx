import '@styles/globals.css';
import Footer from '@ui/components/footer';
import NavbarWrapper from '@ui/components/navbarWrapper';
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
            <body>
                <NavbarWrapper />
                <div className={styles.contentContainer}>{children}</div>
                <Footer />
            </body>
        </html>
    );
}
