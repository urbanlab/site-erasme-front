import Footer from '@components/footer';
import NavbarWrapper from '@components/navbarWrapper';
import '@styles/globals.css';
import type { Metadata } from 'next';
import { K2D } from 'next/font/google';
import styles from './layout.module.css';

export const metadata: Metadata = {
    title: 'ERASME',
    description: "Siteweb d'Erasme",
};

const k2d = K2D({
    weight: ['400', '500', '600', '700'],
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
