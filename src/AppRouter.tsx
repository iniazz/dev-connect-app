import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserDeleteConfirmation from './components/UserDeleteConfirmation';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        {/* <Route path="/delete/:id" element={<UserDeleteConfirmation />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
