import { MenuContainer, MenuItem, MenuHeader, MenuButton } from './styles';
import { IoCloseOutline } from 'react-icons/io5';
import { useDataState } from './AppStateContext';

export const MenuColumn = (props: any) => {

    const { dispatch } = useDataState();
    
    return (
        <MenuContainer>
            <MenuHeader>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    lineHeight: '40px',
                    borderBottom: 'thin solid #C2C2C2'
                    
                }}>Actions</div>
                <MenuButton>
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