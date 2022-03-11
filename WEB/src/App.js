import React, { useEffect } from 'react';
import './App.css';
import {initializeSocketClient} from './app/socketClient';
import { Approver } from './features/approver/Approver';
import { Panel } from './features/approver/Panel';
import { Routes, Route } from 'react-router-dom';
import { Template } from './features/template/Template';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  useEffect(() => {
    initializeSocketClient();

  }, []); 

  return (
    <main>
      <Template>
        <Routes>
          <Route path='/approver' element={<Approver />} />
          <Route path='/panel' element={<Panel />} />
          <Route path="/" element={<Panel />} exact />
          <Route element={<Error />} />
        </Routes>
      </Template>
    </main>);
}

function Error() {
  return (<div>Error</div>)
}
export default App;
