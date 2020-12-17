import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppStateProvider } from './AppStateContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

console.log(process.env);
ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    {/* AppStateProvider allows us to get state and dispatch from any component */}
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </DndProvider>,
  document.getElementById('root')
);
