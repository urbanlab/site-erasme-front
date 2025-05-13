'use client';

import Backdrop from '@ui/elements/backdrop';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from './navbar';

export default function NavbarWrapper() {
    const [isSearchMode, setIsSearchMode] = useState(false);

    //Test to block scroll when the search menu is open, but I don't like it very much. Removing for now.
    //Probably needs to apply to html instead...
    // useEffect(() => {
    //     if (isSearchMode) {
    //         document.body.classList.add('noScroll');
    //         // document.body.style.overflow = 'hidden'
    //     } else {
    //         document.body.classList.remove('noScroll');
    //         // document.body.style.overflow = ''
    //     }
    // }, [isSearchMode]);

    return (
        <>
            <Navbar
                isSearchMode={isSearchMode}
                handleSearchMode={() => setIsSearchMode(previousSearchMode => !previousSearchMode)}
                handleNavigation={() => setIsSearchMode(false)}
            />

            {isSearchMode && createPortal(<Backdrop onClick={() => setIsSearchMode(previousSearchMode => !previousSearchMode)} />, document.body)}
        </>
    );
}
