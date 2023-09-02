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
            {/* Route for the User List */}
            <Route path="/" element={<UserList />} />

            {/* Route for creating a new user */}
            <Route path="/create" element={<UserCreate />} />

            {/* Route for editing an existing user */}
            <Route path="/edit/:id" element={<UserEdit />} />

            {/* Route for user delete confirmation */}
            <Route path="/delete/:id" element={<UserDeleteConfirmation onDeleteConfirmed={function (): void {
            throw new Error('Function not implemented.');
          } } onCancel={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
