# CDN - Complete Developer Network App

Welcome to the CDN - Complete Developer Network Frontend documentation. This React.js and TypeScript-based frontend application is designed to interact with the CDN backend API (dev-connect-api) for managing user profiles.

## Features

- **User Management**: Create, update, and delete user profiles.
- **List of Users**: View a list of registered users with details such as username, email, phone number, skillsets, and hobbies.
- **User Creation**: Add new users to the system with username, email, phone number, skillsets, and hobbies.
- **User Editing**: Modify existing user profiles with updated information.
- **User Deletion**: Delete user profiles with a confirmation prompt.
- **Toast Notifications**: Informative toast notifications for success and error messages.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.X.X)
- [npm](https://www.npmjs.com/get-npm) (version 10.X.X)

### Installation

Clone the frontend repository:

   `git clone https://github.com/iniazz/dev-connect-app.git`
   `cd dev-connect-app`

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Components

`UserList.tsx`
The UserList.tsx component displays a list of registered users and provides options to create, edit, and delete user profiles. It also handles toast notifications for user-related actions.

`UserCreate.tsx`
The UserCreate.tsx component is responsible for creating new user profiles. It includes a form to input user details and handles API requests to create users.

`UserEdit.tsx`
The UserEdit.tsx component allows users to edit existing user profiles. It displays a form with user details and handles API requests to update user information.

`UserDeleteConfirmation.tsx`
The UserDeleteConfirmation.tsx component provides a confirmation prompt when deleting a user profile. It allows users to confirm or cancel the deletion.

### Services

`apiService.ts`
The apiService module handles API requests to the CDN backend. It includes methods for fetching users, creating users, updating user profiles, and deleting users.

`API_BASE_URL` must point to your backend localhost 

## Other Available Scripts
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
