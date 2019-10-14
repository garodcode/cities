import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {IList, ListComponent} from "./components/ListComponent";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders List without crashing', () => {
  const div = document.createElement('div');
  let provider:IList[] = [{id:'1',metaData:'', name:'1',selected: false},
                          {id:'2',metaData:'', name:'2',selected: false}];
  ReactDOM.render(<ListComponent provider={provider} totalItems={provider.length}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders BIG List without crashing', () => {
  const div = document.createElement('div');
  let provider:IList[] = [];
  let cont: number = 0;
  while( cont < 10000 ){
    provider.push({id:''+cont,metaData:''+cont, name:''+cont,selected: false});
    cont+=1;
  }
  ReactDOM.render(<ListComponent provider={provider} totalItems={provider.length}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
