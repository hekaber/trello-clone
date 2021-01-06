import { MenuContainer, MenuItem, MenuHeader, MenuButton } from './styles';
import { IoCloseOutline } from 'react-icons/io5';
import { useDataState, useAppState } from './AppStateContext';
import { useOutsideClick } from './utils/useOutsideClick';
import { useRef } from 'react';

interface MenuColumnProps {
    targetId: string;
    onHide: Function;
}

export const MenuColumn = ({ targetId, onHide }: MenuColumnProps) => {

    const { dispatch } = useDataState();
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(
        ref,
        () => {
            onHide();
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
                    onClick={() => {console.log('clouze')}}
                >
                    <IoCloseOutline />
                </MenuButton>
            </MenuHeader>
            <MenuItem
                onClick={() => {
                    dispatch({
                        type: 'DELETE_LIST',
                        payload: { id: targetId }
                    })
                }}
            >Delete</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
        </MenuContainer>
    );
}