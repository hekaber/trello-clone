import styled from 'styled-components';

interface DragPreviewContainerProps {
    isHidden?: boolean;
    isPreview?: boolean;
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
    transform: ${props => (props.isPreview ? "rotate(5deg)" : undefined)};
    opacity: ${props => (props.isHidden ? 0 : 1)};
`

export const AppContainer = styled.div`
    align-items: flex-start;
    background-color: #3179BA;
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 20px;
    width: 100%;
`

export const ColumnContainer = styled(DragPreviewContainer)`
    background-color: #EBECF0;
    width: 300px;
    position: relative;
    min-height: 40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 8px;
    flex-grow: 0;
`

export const ColumnHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export const MenuHeader = styled.div`
    height: 40px;
`;

interface MenuProps {
    isHidden?: boolean;
}

export const MenuContainer = styled.div<MenuProps>`
    position: absolute;
    width: 300px;
    top: 0;
    background-color: #EBECF0;
    border-radius: 3px;
    border: thin solid #000000;
    z-index: 200;
    padding: 0.5rem;
    box-shadow: #091E4240 0 2px 10px 2px; 
`

export const MenuItem = styled.div<MenuProps>`
    height: 40px;
    line-height: 40px;
    padding: 0.2rem;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
        background-color: #b7b8ba;
    }
`;

export const ColumnTitle = styled.div`
    padding: 6px 16px 12px 0;
    font-weight: bold;
`

export const CardContainer = styled(DragPreviewContainer)`
    background-color: #FFFFFF;
    cursor: pointer;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    max-width: 300px;
    border-radius: 3px;
    box-shadow: #091E4240 0 1px 0 0; 
`
export const MenuButton = styled.a`
    position: absolute;
    top: 3px;
    right: 3px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: #000000;
    border-radius: 3px;
    padding: 0.5rem;
    &:hover {
        background-color: rgba(9,30,66,.08);
    }
    & > svg {
        width: 100%;
        height: 100%;
    }
`

interface AddItemButtonProps {
    dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
    background-color: #FFFFFF3D;
    border-radius: 3px;
    border: none;
    color: ${props => (props.dark ? "#000" : "#FFF")};
    cursor: pointer;
    max-width: 300px;
    padding: 10px 12px;
    text-align: left;
    transition: background 85ms ease-in;
    width: 100%;
    &:hover {
        background-color: #FFFFFF52;
    }
`

export const NewItemFormContainer = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
`

export const NewItemButton = styled.button`
    background-color: #5AAC44;
    border-radius: 3px;
    border: none;
    boy-shadow: none;
    color: #FFF;
    padding: 6px 12px;
    text-align: center;
`
export const NewItemInput = styled.input`
    border-radius: 3px;
    border: none;
    box-shadow: #091E4240 0 1px 0 0;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
`
export const WindowOverLayerContainer = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: 100;
`
