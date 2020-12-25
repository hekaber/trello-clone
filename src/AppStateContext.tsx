import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { save } from './api';
import { DragItem } from './DragItem';
import { moveItem } from './moveItem';
import { PopoverItem } from './PopoverItem';
import { findItemIndexById } from './utils/findItemIndexById';
import { withData } from './withData';

/*
    Define types using discriminated union technique
    Discriminated union: a single field which uses 
    literal types which you can use to let TypeScript narrow down the possible current type
    It means that Action can resolve to one of the forms that we've passed
    Ex: if action.type === 'ADD_LIST' ts will know that action.payload will only be a string
*/
type Action =
    | {
        type: 'SET_DRAGGED_ITEM',
        payload: DragItem | undefined
    }
    | {
        type: 'SET_SHOWN_ITEM',
        payload: PopoverItem | undefined
    }


type DataAction =
    | {
        type: 'ADD_LIST'
        payload: string
    }
    | {
        type: 'ADD_TASK'
        payload: { text: string, columnId: string }
    }
    | {
        type: 'MOVE_LIST',
        payload: { dragIndex: number, hoverIndex: number }
    }
    | {
        type: 'MOVE_TASK',
        payload: {
            dragIndex: number,
            hoverIndex: number,
            sourceColumn: string,
            targetColumn: string
        }
    }
    | {
        type: 'DELETE_LIST',
        payload: {
            id: string
        }
    }

interface Task {
    id: string,
    text: string
}

interface List {
    id: string,
    text: string,
    tasks: Task[]
}

interface AppStateContextProps {
    appState: AppState
    dispatchAppState: React.Dispatch<Action>
}

interface DataStateContextProps {
    state: DataState;
    dispatch: React.Dispatch<DataAction>
}

export interface AppState {
    draggedItem?: DragItem
    displayedItem?: PopoverItem
}

export interface DataState {
    lists: List[]
}

// appData storage
const appData: AppState = {}

// create AppStateContext with app state context props {state: AppState, dispatch: React.Dispatch<Action>}
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const DataStateContext = createContext<DataStateContextProps>({} as DataStateContextProps);

/*
    Will return action payload regarding action type
 */
const dataStateReducer = (state: DataState, action: DataAction): DataState => {
    switch (action.type) {
        case 'ADD_LIST': {

            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuidv4(), text: action.payload, tasks: [] }
                ]
            };
        }
        case 'ADD_TASK': {

            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.columnId
            );
            state.lists[targetLaneIndex].tasks.push({
                id: uuidv4(),
                text: action.payload.text
            });

            return { ...state };
        }
        case 'MOVE_LIST': {

            const { dragIndex, hoverIndex } = action.payload;
            state.lists = moveItem(state.lists, dragIndex, hoverIndex);

            return { ...state };
        }
        case 'MOVE_TASK': {

            const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;
            const sourceLaneIndex = findItemIndexById(
                state.lists,
                sourceColumn
            );
            const targetLaneIndex = findItemIndexById(
                state.lists,
                targetColumn
            );
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

            return { ...state };
        }
        case 'DELETE_LIST': {

            const { id: columnId } = action.payload;
            const targetColumnIndex = findItemIndexById(
                state.lists,
                columnId
            );
            state.lists.splice(targetColumnIndex, 1);
            return { ...state, lists: [...state.lists] };
        }
        default: {
            return state;
        }
    }
}

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case 'SET_DRAGGED_ITEM': {

            return {
                ...state,
                draggedItem: action.payload
            };
        }
        case 'SET_SHOWN_ITEM': {

            return {
                ...state,
                displayedItem: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

// AppDataStateProvider will pass the hardcoded appData through the AppStateContext.Provider
// This component only accepts children as a prop, as we do not want to have any other props
// we pass an empty object to it
export const DataStateProvider = withData(({ children, initialState }: React.PropsWithChildren<{ initialState: DataState }>) => {

    // Takes appStateReducer defined above and appData defined @ l.53
    const [state, dispatch] = useReducer(dataStateReducer, initialState);

    useEffect(() => {
        save(state);
    }, [state]);

    return (
        <DataStateContext.Provider value={{ state, dispatch }}>
            {children}
        </DataStateContext.Provider>
    );
});

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {

    const [appState, dispatchAppState] = useReducer(appStateReducer, appData);

    return (
        <AppStateContext.Provider value={{appState, dispatchAppState}}>
            {children}
        </AppStateContext.Provider>
    );

}
// custom hook who wraps useContext to retrieve the value from AppStateContext
export const useDataState = () => {

    return useContext(DataStateContext);
}

export const useAppState = () => {

    return useContext(AppStateContext);
}
