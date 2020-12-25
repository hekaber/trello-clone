import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDataState, useAppState } from './AppStateContext';
import { CardDragItem } from './DragItem';
import { CardContainer } from './styles';
import { useItemDrag } from './useItemDrag';
import { isHidden } from './utils/isHidden';


interface CardProps {
    isPreview?: boolean;
    id: string;
    text: string;
    index: number;
    columnId: string;
}

export const Card = ({ id, text, columnId, index, isPreview }: CardProps) => {

    const { dispatch } = useDataState();
    const { appState } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const { drag } = useItemDrag({ type: 'CARD', id, index, text, columnId });

    const [, drop] = useDrop({
        accept: 'CARD',
        hover(item: CardDragItem) {

            const dragIndex = item.index;
            const hoverIndex = index;
            const sourceColumn = item.columnId;
            const targetColumn = columnId;

            if (dragIndex === hoverIndex) {
                return;
            }

            dispatch({ type: 'MOVE_TASK', payload:{ dragIndex, hoverIndex, sourceColumn, targetColumn }});
            item.index = hoverIndex;
            item.columnId = targetColumn;
        }
    });

    drag(drop(ref));

    return <CardContainer
        ref={ref}
        isPreview={isPreview}
        isHidden={isHidden(isPreview, appState.draggedItem, 'CARD', id)}
    >
        {text}
    </CardContainer>
}
