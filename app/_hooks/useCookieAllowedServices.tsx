'use client';

import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

export default function useCookieAllowedServices() {
    const [allowedServices, setAllowedServices] = useState<string[]>([]);

    useEffect(() => {
        setAllowedServices(CookieConsent.getUserPreferences().acceptedServices['analytics']);

        return () => {};
    }, []);

    return allowedServices;
}
