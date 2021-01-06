import { WindowOverLayerContainer } from './styles';
import { MenuColumn } from './MenuColumn';
import { useAppState } from './AppStateContext'; 

export const PopoverLayer = () => {

    const { appState } = useAppState();
    const { displayedItem } = appState; 

    if (displayedItem) {

        return displayedItem.isShown ? (
            <WindowOverLayerContainer>
                <div style={getItemStyles(displayedItem.position)} >
                    <MenuColumn 
                        targetId={displayedItem.targetId}
                    />
                </div>
            </WindowOverLayerContainer>
        ) : null;
    }

    return null;
}

const getItemStyles = (currRect: DOMRect | undefined ): React.CSSProperties => {

    const style = { position: 'absolute', pointerEvents: 'initial' } as React.CSSProperties;
    if (!currRect) {
        return {
            ...style,
            top: '0',
            left: '0'
        };
    }

    return {
        ...style,
        top: `${currRect.y + 40}px`,
        left: `${currRect.x + currRect.width - 40}px`
    }
}