'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export type CookieCategory = 'necessary' | 'analytics';
export type CookieService = 'youtube' | 'vimeo';

export default function CookieConsentManager() {
    useEffect(() => {
        CookieConsent.run({
            cookie: {
                name: 'cc_cookie',
                expiresAfterDays: 365,
                useLocalStorage: false,
            },

            categories: {
                necessary: {
                    enabled: true, // this category is enabled by default
                    readOnly: true, // this category cannot be disabled
                },
                analytics: {
                    enabled: true,
                    readOnly: false, // this category can be enabled/disabled by the user
                    services: {
                        youtube: {
                            label: 'Youtube',
                            onAccept: () => {},
                            onReject: () => {},
                        },
                        vimeo: {
                            label: 'Vimeo',
                            onAccept: () => {},
                            onReject: () => {},
                        },
                    },
                },
            },

            language: {
                default: 'fr',
                translations: {
                    fr: {
                        consentModal: {
                            title: 'Cookies',
                            description:
                                'Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer',
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            showPreferencesBtn: 'Personnaliser',
                        },
                        preferencesModal: {
                            title: 'Panneau de gestion des cookies',
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            savePreferencesBtn: 'Enregistrer les préférences',
                            closeIconLabel: 'Fermer',
                            sections: [
                                {
                                    title: `Quelqu'un a dit... cookies?`,
                                    description: `En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.`,
                                },
                                {
                                    title: 'Cookies obligatoires',
                                    description:
                                        'Ce site utilise des cookies nécessaires à son bon fonctionnement. Ils ne peuvent pas être désactivés.',

                                    //this field will generate a toggle linked to the 'necessary' category
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description:
                                        'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                    linkedCategory: 'analytics',
                                },
                                {
                                    title: 'More information',
                                    description:
                                        'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                                },
                            ],
                        },
                    },
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description: 'Cookie modal description',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage Individual preferences',
                        },
                        preferencesModal: {
                            title: 'Manage cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Accept current selection',
                            closeIconLabel: 'Close modal',
                            sections: [
                                {
                                    title: 'Somebody said ... cookies?',
                                    description: 'I want one!',
                                },
                                {
                                    title: 'Strictly Necessary cookies',
                                    description:
                                        'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                                    //this field will generate a toggle linked to the 'necessary' category
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description:
                                        'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                    linkedCategory: 'analytics',
                                },
                                {
                                    title: 'More information',
                                    description:
                                        'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                                },
                            ],
                        },
                    },
                },
            },
        });
    }, []);

    return null;
}
