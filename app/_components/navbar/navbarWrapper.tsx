'use client';

import Backdrop from '@components/backdrop';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from './navbar';

export default function NavbarWrapper() {
    const [isIsolated, setIsIsolated] = useState(false);

    //Test to block scroll when the search menu is open, but I don't like it very much. Removing for now.
    //Probably needs to apply to html instead...
    // useEffect(() => {
    //     if (isIsolated) {
    //         document.body.classList.add('noScroll');
    //         // document.body.style.overflow = 'hidden'
    //     } else {
    //         document.body.classList.remove('noScroll');
    //         // document.body.style.overflow = ''
    //     }
    // }, [isIsolated]);

    const handleIsolation = () => {
        setIsIsolated(prevIsIsolated => !prevIsIsolated);
    };

    return (
        <>
            <Navbar isSearchMode={isIsolated} handleSearchMode={handleIsolation} />

            {isIsolated && createPortal(<Backdrop onClick={handleIsolation} />, document.body)}
        </>
    );
}
