import React, { useRef, useEffect } from 'react';
import { useOutsideClick } from './utils/useOutsideClick';
import { useAppState } from './AppStateContext';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { DragItem } from './DragItem';
import { ColumnContainer, ColumnTitle, ColumnHeader, MenuButton } from './styles';
import { IoMenuOutline } from 'react-icons/io5';
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
        accept: ['COLUMN', 'CARD'],
        hover(item: DragItem) {
            if (item.type === 'COLUMN') {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
                item.index = hoverIndex;
            }
            else {
                const dragIndex = item.index;
                const hoverIndex = 0;
                const sourceColumn = item.columnId;
                const targetColumn = id;

                if (sourceColumn === targetColumn) {
                    return;
                }

                dispatch({ type: 'MOVE_TASK', payload: { dragIndex, hoverIndex, sourceColumn, targetColumn } });
                item.index = hoverIndex;
                item.columnId = targetColumn;
            }

        }
    });

    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const showMenu = state.displayedItem ? state.displayedItem.isShown : false;

    useOutsideClick(ref, () => {
        dispatch({
            type: 'SET_SHOWN_ITEM',
            payload: {
                type: 'MENU_COLUMN',
                isShown: false
            }
        });
    });

    const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });

    drag(drop(ref));

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
        >
            <ColumnHeader>
                <ColumnTitle>{text}</ColumnTitle>
                <MenuButton
                    onClick={() => {
                        dispatch({
                            type: 'SET_SHOWN_ITEM',
                            payload: {
                                type: 'MENU_COLUMN',
                                isShown: !showMenu,
                                position: ref?.current?.getBoundingClientRect()
                            }
                        });
                    }}
                >
                    <IoMenuOutline />
                </MenuButton>

            </ColumnHeader>

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

