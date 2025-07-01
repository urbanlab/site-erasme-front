'use client';

import { ControlledComponentType } from '@globals/types';
import { useIsDesktop } from '@hooks/useIsDesktop';
import Backdrop from '@ui/elements/backdrop';
import { searchFilterMap } from '@utils/searchUtils';
import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from './navbar';

export default function NavbarWrapper() {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchFilter, setSearchFilter] = useState<ControlledComponentType>(searchFilterMap.tout);

    const isDesktop = useIsDesktop();

    const handleSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event?.currentTarget);
        const inputValue = formData.get('searchInput') as string;

        setSearchInput(inputValue);
        setShowSearchResults(true);
    };

    const handleSearchFilterChange = (event: ControlledComponentType) => {
        setSearchFilter(event);
    };

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
                isDesktop={isDesktop}
                isSearchMode={isSearchMode}
                searchInput={searchInput}
                searchFilter={searchFilter}
                showSearchResults={showSearchResults}
                handleSearchMode={() => {
                    setIsSearchMode(previousSearchMode => !previousSearchMode);
                    setShowSearchResults(false);
                }}
                handleSearchFormSubmit={handleSearchFormSubmit}
                handleNavigation={() => setIsSearchMode(false)}
                handleSearchFilterChange={handleSearchFilterChange}
            />

            {isDesktop &&
                isSearchMode &&
                createPortal(
                    <Backdrop onClick={() => setIsSearchMode(previousSearchMode => !previousSearchMode)} />,
                    document.body
                )}
        </>
    );
}
