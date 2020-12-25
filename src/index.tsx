import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppStateProvider, DataStateProvider } from './AppStateContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    {/* AppStateProvider allows us to get state and dispatch from any component */}
    <DataStateProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DataStateProvider>
  </DndProvider>,
  document.getElementById('root')
);
