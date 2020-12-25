import React, { useState } from "react";
import { MenuContainer, MenuButton, MenuItem } from "./styles";
import { IoMenuOutline, IoArrowForward } from 'react-icons/io5';
import { useDataState } from "./AppStateContext";

interface SideMenuProps {
    columnId: string
}

export const SideMenu = (props: SideMenuProps) => {

    const [showMenu, setShowMenu] = useState(false);
    const { columnId } = props;
    const { dispatch } = useDataState();
    
    return (
        <React.Fragment>
            <MenuButton
                onClick={() => { setShowMenu(true) }}
            >
                <IoMenuOutline />
            </MenuButton>
            <MenuContainer
                isHidden={!showMenu}
            >
                <MenuItem
                    onClick={() => {dispatch({type: 'DELETE_LIST', payload: { id: columnId}})}}
                >
                    Delete List
                    </MenuItem>
                <MenuItem>Delete Task</MenuItem>
                <MenuButton
                    onClick={() => setShowMenu(false)}
                >
                    <IoArrowForward />
                </MenuButton>
            </MenuContainer>
        </React.Fragment>
    );
}