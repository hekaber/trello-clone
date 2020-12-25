import { WindowOverLayerContainer } from './styles';
import { MenuColumn } from './MenuColumn';
import { useAppState } from './AppStateContext'; 

export const PopoverLayer = () => {

    const { appState } = useAppState();
    const { displayedItem } = appState; 


    return displayedItem?.isShown ? (
        <WindowOverLayerContainer>
            <div style={getItemStyles(displayedItem?.position)} >
                <MenuColumn 
                
                />
            </div>
        </WindowOverLayerContainer>
    ) : null;
}

const getItemStyles = (currRect: DOMRect | undefined ): React.CSSProperties => {

    const style = { position: 'absolute' } as React.CSSProperties;
    if ( typeof currRect === undefined) {
        return {
            ...style,
            top: '0',
            left: '0'
        };
    }

    const leftPos = currRect ? currRect.x + currRect.width : 0; 
    return {
        ...style,
        top: `${currRect?.y}px`,
        left: `${leftPos}px`
    }
}