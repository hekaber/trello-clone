import React from 'react';
import { AppContainer } from './styles';
import { Column } from './Column';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { CustomDragLayer } from './CustomDragLayer';
import { PopoverLayer } from './PopoverLayer';

const App = () => {

  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      <PopoverLayer />
      {/* type of state is AppState because already provided when we called CreateContext in AppStateContext.tsx */}
      { state.lists.map((list, i) => {
        return <Column id={list.id} text={list.text} key={list.id} index={i}/>
      })}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={text => dispatch({type: 'ADD_LIST', payload: text})}/>
    </AppContainer>
  );
}

export default App;
