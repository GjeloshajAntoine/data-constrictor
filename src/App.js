import React from 'react';

import { Provider } from 'react-redux'
import rootReducer from "./reducers"
import { createStore } from 'redux'

import TablesContainer from './containers/tablesContainer'


const rows = [
  createData('Id', "float", ["httpApi","Facebook.Api"], ['Unique','Auto increments'], []),
  createData('Title', "string", ["Facebook.Api"], ['Unique','Auto increments','differents'], []),
  createData('IsActive', "boolean",  ["default"], ['Unique','Auto increments'], []),
  createData('IsVisisble', "boolean",  ["default"], ['Unique','Auto increments','UpperCase'], []),
  createData('Redux', "int",  ["default"], ['Unique','Auto increments','UpperCase'], []),
];

function createData(name, type = "", dataSources = [], constraints = [], protein = []) {
  return { name, type, dataSources, constraints, protein };
}

const store = createStore(rootReducer,{Tablefields :rows})

function App() {

  return (
    <Provider store={store}>
      <TablesContainer></TablesContainer>
    </Provider>
  );
}

export default App;
