import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserRegistration from './components/UserCreate';
import UserUpdate from './components/UserEdit';
import UserDeletion from './components/UserDeleteConfirmation';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element  Component={UserList} />
        <Route path="/register" Component={UserRegistration} />
        <Route path="/update/:id" Component={UserUpdate} />
        {/* <Route path="/delete/:id" Component={UserDeletion} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
