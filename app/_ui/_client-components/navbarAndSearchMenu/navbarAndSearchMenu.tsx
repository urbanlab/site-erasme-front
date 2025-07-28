'use client';

import { ControlledComponentValueType } from '@globals/types';
import { useIsDesktop } from '@hooks/useIsDesktop';
import Backdrop from '@ui/components/backdrop';
import {
    addSuggestionToList,
    getSearchSuggestionsFromLocalStorage,
    removeSuggestionFromList,
} from '_ui/_client-components/navbarAndSearchMenu/_utils/searchUtils';
import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from './_navbar/navbar';

export default function NavbarAndSearchMenu({ className }: { className?: string }) {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedSearchFilter, setSelectedSearchFilter] = useState<ControlledComponentValueType>(null);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

    //Only initialize the state after the first render to avoid hydration errors
    useEffect(() => {
        setSearchSuggestions(getSearchSuggestionsFromLocalStorage());
    }, []);

    const isDesktop = useIsDesktop();

    const handleSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event?.currentTarget);
        const inputValue = formData.get('searchInput') as string;

        setSearchInput(inputValue);
        setSearchSuggestions(addSuggestionToList(inputValue));
        setShowSearchResults(true);
    };

    const handleRemoveSearchSuggestion = (suggestion: string) => {
        setSearchSuggestions(removeSuggestionFromList(suggestion));
    };

    const handleSearchFilterChange = (searchFilter: ControlledComponentValueType) => {
        setSelectedSearchFilter(searchFilter);
    };

    return (
        <>
            <Navbar
                isDesktop={isDesktop}
                isSearchMode={isSearchMode}
                searchInput={searchInput}
                selectedSearchFilter={selectedSearchFilter}
                showSearchResults={showSearchResults}
                searchSuggestions={searchSuggestions}
                handleSearchMode={() => {
                    setIsSearchMode(previousSearchMode => !previousSearchMode);
                    setShowSearchResults(false);
                }}
                handleSearchFormSubmit={handleSearchFormSubmit}
                handleNavigation={() => setIsSearchMode(false)}
                handleSearchFilterChange={handleSearchFilterChange}
                handleRemoveSearchSuggestion={handleRemoveSearchSuggestion}
                className={className}
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
