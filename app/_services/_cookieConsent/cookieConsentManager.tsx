'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

/**
 * Extracts the service name from a given URL.
 *
 * This function analyzes the hostname of the provided URL and maps it to a known third-party service
 * (such as 'youtube', 'vimeo', 'google', etc.). If the hostname does not match any known service,
 * it returns the main domain as a fallback. Note that this fallback indicates that the service consent is 
 * not configured, yet. You will need to add it to the list below and to include it in {@link CookieConsentManager}.
 *
 * @param url - The url as a string.
 * @returns The detected service name as a string (e.g., 'youtube', 'vimeo', etc.), or the main domain as a fallback.
 */
const getServiceName = (url: string): string => {
    let service: string = '';
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname;

    if (host.includes('youtube.com') || host.includes('youtu.be') || host.includes('youtube-nocookie.com')) {
        service = 'youtube';
    } else if (host.includes('vimeo.com')) {
        service = 'vimeo';
    } else if (host.includes('slideshare.net')) {
        service = 'slideshare';
    } else if (host.includes('docs.google.com')) {
        service = 'google';
    } else if (host.includes('dailymotion.com')) {
        service = 'dailymotion';
    } else if (host.includes('openstreetmap.org')) {
        service = 'openstreetmap';
    } else if (host.includes('vine.co')) {
        service = 'vine';
    } else if (host.includes('pearltrees.com')) {
        service = 'pearltrees';
    } else if (host.includes('notion.so')) {
        service = 'notion';
    } else if (host.includes('calameo.com')) {
        service = 'calameo';
    } else if (host.includes('kumu.io')) {
        service = 'kumu';
    } else if (host.includes('spotify.com')) {
        service = 'spotify';
    } else if (host.includes('storify.com')) {
        service = 'storify';
    } else if (host.includes('flickrit.com') || host.includes('flickr.com')) {
        service = 'flickr';
    } else if (host.includes('dmcloud.net')) {
        service = 'dmcloud';
    } else if (host.includes('projectorcentral.com')) {
        service = 'projectorcentral';
    } else if (host.includes('mind42.com')) {
        service = 'mind42';
    } else {
        service = host.split('.').slice(-2, -1)[0]; // fallback: take the domain
    }
    return service;
};

/**
 * Configures cookie consent interfaces.
 * If something changes, make sure to increase the revision number.
 */
const CookieConsentManager = () => {
    useEffect(() => {
        CookieConsent.run({
            revision: 0,

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
                thirdParty: {
                    enabled: true,
                    readOnly: false, // this category can be enabled/disabled by the user
                    services: {
                        youtube: {
                            label: 'Youtube',
                        },
                        vimeo: {
                            label: 'Vimeo',
                        },
                        slideshare: {
                            label: 'Slideshare',
                        },
                        google: {
                            label: 'Google',
                        },
                        dailymotion: {
                            label: 'Dailymotion',
                        },
                        openstreetmap: {
                            label: 'OpenStreetMap',
                        },
                        vine: {
                            label: 'Vine',
                        },
                        peartrees: {
                            label: 'Pearltrees',
                        },
                        notion: {
                            label: 'Notion',
                        },
                        calameo: {
                            label: 'Calameo',
                        },
                        flickr: {
                            label: 'Flickr',
                        },
                        kumu: {
                            label: 'Kumu',
                        },
                        spotify: {
                            label: 'Spotify',
                        },
                        storify: {
                            label: 'Storify',
                        },
                        dmcloud: {
                            label: 'Dmcloud',
                        },
                        projectorcentral: {
                            label: 'Projector Central',
                        },
                        mind42: {
                            label: 'Mind42',
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
                                    description: `Nous, ainsi que des tiers, utilisons des cookies et d’autres technologies pour améliorer votre expérience.
                                        Veuillez choisir quels types de cookies et autres technologies seront activés lors de votre navigation sur notre site web.`,
                                },
                                {
                                    title: 'Cookies obligatoires',
                                    description: `Ce site utilise des cookies nécessaires à son bon fonctionnement. 
                                        Ces cookies ne collectent aucune information personnelle identifiable.`,

                                    //this field will generate a toggle linked to the 'necessary' category
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Services de tiers',
                                    description: `Notre site utilise des contenus intégrés provenant de services tiers (comme YouTube, Vimeo, Google Maps, etc.).
                                        Ces services peuvent déposer des cookies permettant de collecter des données personnelles à des fins de statistiques, de publicité ou de personnalisation.
                                        Vous pouvez choisir d’activer ou non ces services selon vos préférences.`,
                                    linkedCategory: 'thirdParty',
                                },
                                {
                                    title: `Plus d'informations`,
                                    description:
                                        'Pour toute question relative à notre politique en matière de cookies et à vos choix, veuillez nous <a href="/contact">contacter</a>',
                                },
                            ],
                        },
                    },
                },
            },
        });
    }, []);

    return null;
};

export { CookieConsentManager, getServiceName };
