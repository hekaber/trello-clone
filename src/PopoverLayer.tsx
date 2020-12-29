import { WindowOverLayerContainer } from './styles';
import { useRef } from 'react';
import { MenuColumn } from './MenuColumn';
import { useAppState } from './AppStateContext'; 
// import { handleOutsideClick } from './utils/handleOutsideClick';

export const PopoverLayer = () => {

    const { appState, dispatchAppState } = useAppState();

    const { displayedItem } = appState; 
    const ref = useRef<HTMLDivElement>(null);

    if (displayedItem) {

        return displayedItem.isShown ? (
            <WindowOverLayerContainer>
                <div style={getItemStyles(displayedItem.position)} >
                    <MenuColumn 
                        ref={ref}
                        targetId={displayedItem.targetId}
                    />
                </div>
            </WindowOverLayerContainer>
        ) : null;
    }

    return null;
    // handleOutsideClick(
    //     ref,
    //     !showMenu,
    //     () => {
    //         dispatchAppState({
    //             type: 'SET_SHOWN_ITEM',
    //             payload: {
    //                 type: 'MENU_COLUMN',
    //                 isShown: false,
    //             }
    //         })
    //     }
    // )

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