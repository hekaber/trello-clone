import { XYCoord, useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { CustomDragLayerContainer } from './styles';

export const CustomDragLayer = () => {

    const { isDragging, currentOffset, item } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
                <Column
                    id={item.id}
                    text={item.text}
                    index={item.index}
                    isPreview={true}
                />
            </div>
        </CustomDragLayerContainer>
    ) : null;
}

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {

    if (!currentOffset) {
        return {
            display: 'none'
        }
    }
    const { x, y } = currentOffset;
    const translate = `translate(${x}px, ${y}px)`;
    return {
        transform: translate,
        WebkitTransform: translate
    }
}