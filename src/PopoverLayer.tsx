import { useState } from 'react';
import { WindowOverLayerContainer } from './styles';
import { MenuColumn } from './MenuColumn';

interface PopoverLayerProps {
    show: boolean;
    targetId: string;
    onHide: Function;
    position?: DOMRect | undefined;
}

export const PopoverLayer = ({ show, targetId, position, onHide }: PopoverLayerProps) => {

    return show ? (
        <WindowOverLayerContainer>
            <div style={getItemStyles(position)} >
                <MenuColumn
                    targetId={targetId}
                    onHide={onHide}
                />
            </div>
        </WindowOverLayerContainer>
    ) : null;
}

const getItemStyles = (currRect: DOMRect | undefined): React.CSSProperties => {

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