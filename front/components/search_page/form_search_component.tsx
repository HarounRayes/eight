'use client';

import { useDebouncedQuery } from '@/lib/useDebouncedQuery';
import { useAppDispatch } from '@/store/Hooks';
import { search } from '@/store/Reducers/api/searchSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

interface FormSearchComponentProps {
    isMobile: boolean;
    setHasTerm: (hasTerm: boolean) => void;
}

const FormSearchComponent: React.FC<FormSearchComponentProps> = ({ isMobile, setHasTerm }) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

        
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const debouncedSearchTerm = useDebouncedQuery(searchTerm, 600);

    useEffect(() => {
        setHasTerm(debouncedSearchTerm.trim().length > 0);
        if (debouncedSearchTerm.trim()) {
            fetchData();
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const queryString = debouncedSearchTerm.trim() ? `?q=${encodeURIComponent(debouncedSearchTerm)}` : "";
        router.replace(`/search${queryString}`);
    }, [debouncedSearchTerm, router]);

    const fetchData = useCallback(async () => {
        if (isSearching) return;
        try {
            setIsSearching(true);
            if (debouncedSearchTerm.trim()) {
                const action = await dispatch(search(debouncedSearchTerm));
                if (search.fulfilled.match(action)) {
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSearching(false);
        }
    }, [dispatch, debouncedSearchTerm]);

    useEffect(() => {
        if (initialQuery) {
            setSearchTerm(initialQuery);
            fetchData();
        }
    }, [initialQuery]);

    const [isSearching, setIsSearching] = useState(false);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchData();
        }
    };

    return (
        <form className="w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isMobile ? "Search" : "Search through over 70 million podcasts and episodes..."}
                className="w-full rounded-xl py-[7px] px-[10px] border focus:bg-[#2f314740] border-[#50515dcc] text-center text-sm text-[#FFF] placeholder-gray-500 focus:border-[#6e58bd] focus-bg-[#10142780] focus:outline-none"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = isMobile ? "Search" : "Search through over 70 million podcasts and episodes...")}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
};

export default FormSearchComponent;