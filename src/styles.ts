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

interface SideMenuProps {
    isHidden?: boolean;
}

export const SideMenuContainer = styled.div<SideMenuProps>`
    position: absolute;
    width: 200px;
    top: 0;
    background-color: #EBECF0;
    border-radius: 3px;
    border: thin solid #000000;
    right: ${props => (props.isHidden ? '-200px' : '0' )};
    transition: all 200ms linear;
    opacity: ${props => (props.isHidden ? 0 : 1 )};
    z-index: ${props => (props.isHidden ? '-1' : '100' )};
`

export const SideMenuItem = styled.div<SideMenuProps>`
    padding: 0.2rem;
    border-bottom: thin solid #000000;
    opacity: ${props => (props.isHidden ? 0 : 1 )};
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

export const ShowMenuButton = styled.button`
    cursor: pointer;
    font-size: 0.5rem;
    color: #000000;
    padding: 0.5em;
    border-radius: 3px;
    border: thin solid #000000;
    width: 17px;
    height: 19px;
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
export const CustomDragLayerContainer = styled.div`
    height: 100%;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
`
