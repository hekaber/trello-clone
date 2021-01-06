import { MenuContainer, MenuItem, MenuHeader, MenuButton } from './styles';
import { IoCloseOutline } from 'react-icons/io5';
import { useDataState, useAppState } from './AppStateContext';
import { useOutsideClick } from './utils/useOutsideClick';
import { useRef } from 'react';


export const MenuColumn = (props: any) => {

    const { dispatch } = useDataState();
    const { appState, dispatchAppState } = useAppState();
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(
        ref,
        () => {
            
            dispatchAppState(
            {
                type: 'SET_SHOWN_ITEM',
                payload: {
                    type: 'MENU_COLUMN',
                    clickSource: 'OUT',
                    isShown: false
                }
            }
        );
    }
    );

    return (
        <MenuContainer ref={ref}>
            <MenuHeader>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    lineHeight: '40px',
                    borderBottom: 'thin solid #C2C2C2'

                }}>Actions</div>
                <MenuButton
                    onClick={() => {dispatchAppState(
                        {
                            type: 'SET_SHOWN_ITEM',
                            payload: {
                                type: 'MENU_COLUMN',
                                clickSource: 'BUTTON',
                                isShown: false
                            }
                        }
                    );}}
                >
                    <IoCloseOutline />
                </MenuButton>
            </MenuHeader>
            <MenuItem
                onClick={() => {
                    dispatch({
                        type: 'DELETE_LIST',
                        payload: { id: props.targetId }
                    })
                }}
            >Delete</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
        </MenuContainer>
    );
}