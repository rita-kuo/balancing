import { useMemo } from 'react';

type LocalStorageKey = 'userId';
const useLocalStorage = () =>
    useMemo(
        () => ({
            get: (key: LocalStorageKey) => {
                if (typeof window === 'undefined') return undefined;
                const str = localStorage.getItem(key);
                return str || undefined;
            },
            set: <T>(key: LocalStorageKey, value: T) => {
                if (typeof window !== 'undefined')
                    localStorage.setItem(key, JSON.stringify(value));
            },
        }),
        []
    );

export default useLocalStorage;
