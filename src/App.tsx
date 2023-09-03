import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserDeleteConfirmation from './components/UserDeleteConfirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<UserCreate />} />
            <Route path="/edit/:id" element={<UserEdit />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
