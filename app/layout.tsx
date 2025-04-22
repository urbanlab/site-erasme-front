import type { Metadata } from 'next';
import '@styles/globals.css';
import { K2D } from 'next/font/google';
import Footer from '@components/footer';
import styles from './layout.module.css';
import Header from '@components/header';

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
                <Header />
                <div className={styles.contentContainer}>{children}</div>
                <Footer />
            </body>
        </html>
    );
}
