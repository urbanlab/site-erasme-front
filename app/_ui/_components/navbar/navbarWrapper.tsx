'use client';

import { ControlledComponentValueType } from '@globals/types';
import { useIsDesktop } from '@hooks/useIsDesktop';
import Backdrop from '@ui/elements/backdrop';
import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from './navbar';

export default function NavbarWrapper() {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedSearchFilter, setSelectedSearchFilter] = useState<ControlledComponentValueType>(null);

    const isDesktop = useIsDesktop();

    const handleSearchInputChange = (input: string) => {
        setSearchInput(input);
    };

    const handleSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSearchInput(searchInput);
        setShowSearchResults(true);
    };

    const handleSearchFilterChange = (searchFilter: ControlledComponentValueType) => {
        setSelectedSearchFilter(searchFilter);
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
                selectedSearchFilter={selectedSearchFilter}
                showSearchResults={showSearchResults}
                handleSearchMode={() => {
                    setIsSearchMode(previousSearchMode => !previousSearchMode);
                    setShowSearchResults(false);
                }}
                handleSearchInputChange={handleSearchInputChange}
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
