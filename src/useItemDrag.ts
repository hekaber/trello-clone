import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAppState } from './AppStateContext';
import { DragItem } from './DragItem';

export const useItemDrag = (item: DragItem) => {

    const { dispatchAppState } = useAppState();
    //The preview function accepts an elelment or node to use as a drag preview
    const [, drag, preview] = useDrag({
        item,
        begin: () =>
            dispatchAppState({
                type: 'SET_DRAGGED_ITEM',
                payload: item
            }),
        end: () => dispatchAppState({ type: 'SET_DRAGGED_ITEM', payload: undefined})

    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview]);
    return { drag };
}
