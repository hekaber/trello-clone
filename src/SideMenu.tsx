import React, { useState } from "react";
import { SideMenuContainer, ShowMenuButton, SideMenuItem } from "./styles";
import { IoMenuOutline, IoArrowForward } from 'react-icons/io5';
import { useAppState } from "./AppStateContext";

interface SideMenuProps {
    columnId: string
}

export const SideMenu = (props: SideMenuProps) => {

    const [showMenu, setShowMenu] = useState(false);
    const { columnId } = props;
    const { dispatch } = useAppState();

    return (
        <React.Fragment>
            <ShowMenuButton
                onClick={() => { setShowMenu(true) }}
            >
                <IoMenuOutline />
            </ShowMenuButton>
            <SideMenuContainer
                isHidden={!showMenu}
            >
                <SideMenuItem
                    onClick={() => {dispatch({type: 'DELETE_LIST', payload: { id: columnId}})}}
                >
                    Delete List
                    </SideMenuItem>
                <SideMenuItem>Delete Task</SideMenuItem>
                <ShowMenuButton
                    onClick={() => setShowMenu(false)}
                >
                    <IoArrowForward />
                </ShowMenuButton>
            </SideMenuContainer>
        </React.Fragment>
    );
}