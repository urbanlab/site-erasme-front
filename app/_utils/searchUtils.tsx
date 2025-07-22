import { ControlledComponentType } from '@globals/types';

const searchSuggestionsKey: string = 'searchSuggestions';

const searchFilterMap: Record<string, ControlledComponentType> = {
    tout: {
        label: 'Tout',
        value: null,
    },
    article: {
        label: 'Article',
        value: 'Article',
    },
    rubrique: {
        label: 'Rubrique',
        value: 'Rubrique',
    },
    image: {
        label: 'Image',
        value: 'Image',
    },
    document: {
        label: 'Document',
        value: 'Document',
    },
};

/**
 * Retrieves the list of search suggestions from localStorage.
 *
 * Attempts to parse the stored value as a JSON array. If the stored value is a single string
 * instead of an array, it will be wrapped in an array to ensure consistent return type.
 * If nothing is stored, returns an empty array.
 *
 * @returns An array of search suggestion strings from localStorage.
 */
const getSearchSuggestionsFromLocalStorage = (): string[] => {
    const rawStringFromLocalStorage = localStorage.getItem(searchSuggestionsKey);

    let currentValues: string[] = [];
    if (rawStringFromLocalStorage) {
        currentValues = JSON.parse(rawStringFromLocalStorage);

        //edge-case: if rawStringFromLocalStorage is a simple single string instead of an array-like string
        currentValues = Array.isArray(currentValues) ? currentValues : [currentValues];
    }

    return currentValues;
};

/**
 * Adds a new search suggestion to the list in localStorage if it does not already exist.
 *
 * Retrieves the current list of suggestions, adds the new input at the beginning if not present,
 * keeps a maximum of 5 suggestions (removing the oldest if needed), updates localStorage,
 * and returns the updated list.
 * 
 * @param input - The search suggestion string to add.
 * @returns The updated array of search suggestion strings from localStorage.
 */
const addSuggestionToList = (input: string): string[] => {
    const suggestions: string[] = getSearchSuggestionsFromLocalStorage();

    //Only add input to array if not present yet. The item is added at the beginning
    const updatedSuggestions = suggestions.includes(input) ? suggestions : [input, ...suggestions];

    //Keep 5 items maximum. Remove the oldest item if needed
    const latestSuggestions = updatedSuggestions.slice(0, 5)

    localStorage.setItem(searchSuggestionsKey, JSON.stringify(latestSuggestions));

    return latestSuggestions;
};

/**
 * Removes a search suggestion from the list in localStorage.
 *
 * Retrieves the current list of suggestions, removes the specified suggestion,
 * updates localStorage, and returns the updated list.
 *
 * @param suggestionToRemove - The search suggestion string to remove.
 * @returns The updated array of search suggestion strings from localStorage.
 */
const removeSuggestionFromList = (input: string): string[] => {
    const suggestions = getSearchSuggestionsFromLocalStorage();

    const updatedSuggestions = suggestions.filter(item => item !== input);

    localStorage.setItem(searchSuggestionsKey, JSON.stringify(updatedSuggestions));

    return updatedSuggestions;
};

export { searchFilterMap, getSearchSuggestionsFromLocalStorage, addSuggestionToList, removeSuggestionFromList };
