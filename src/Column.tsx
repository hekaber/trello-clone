import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { DragItem } from './DragItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { useItemDrag } from './useItemDrag';
import { isHidden } from './utils/isHidden';

interface ColumnProps {
    isPreview?: boolean,
    text: string,
    index: number,
    id: string
}

export const Column = ({ isPreview, text, index, id }: ColumnProps) => {

    const [, drop] = useDrop({
        accept: 'COLUMN',
        hover(item: DragItem) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
            item.index = hoverIndex;
        }
    });
    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });

    drag(drop(ref));

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
        >
            <ColumnTitle>{text}</ColumnTitle>
            { state.lists[index].tasks.map((task, i) => {
                return <Card
                    key={task.id}
                    id={task.id}
                    columnId={id}
                    text={task.text}
                    index={i}
                />
            })}
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch({ type: 'ADD_TASK', payload: { text, columnId: id } })}
                dark
            />
        </ColumnContainer>

    );
}

