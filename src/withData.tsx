import React, { PropsWithChildren, ComponentType, useState, useEffect } from 'react';
import { load } from './api';
import { DataState } from './AppStateContext';

// HOC pattern
export const withData = (
    WrappedComponent: ComponentType<PropsWithChildren<{ initialState: DataState }>>
) => {

    return ({ children }: PropsWithChildren<{}>) => {

        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined>();
        const [initialState, setInitialState] = useState<DataState>({
            lists: []
        });

        useEffect(() => {
            const fetchInitialState = async () => {
                try {

                    const data = await load();
                    setInitialState(data);
                } catch (error) {
                    setError(error);
                }
                setIsLoading(false);
            }

            fetchInitialState();
        }, []);

        if (isLoading) {
            return (
                <div>Loading...</div>
            );
        }

        if (error) {
            return (
                <div>{error.message}</div>
            );
        }
        return (
            <WrappedComponent initialState={initialState}>
                {children}
            </WrappedComponent>
        );
    };
}
