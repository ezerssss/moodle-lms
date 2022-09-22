import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import LoginPage from './pages/Login';

import './index.css';
import {
  ASSIGNMENTS_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  QUIZZES_PAGE,
} from './constants/routes';
import QuizzesPage from './pages/Quizzes';
import AuthorizedRoute from './components/AuthorizedRoute';
import AssignmentsPage from './pages/Assignments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginPage />} path={LOGIN_PAGE} />
            <Route
              element={
                <AuthorizedRoute>
                  <App />
                </AuthorizedRoute>
              }
              path={HOME_PAGE}
            />
            <Route
              element={
                <AuthorizedRoute>
                  <AssignmentsPage />
                </AuthorizedRoute>
              }
              path={ASSIGNMENTS_PAGE}
            />
            <Route
              element={
                <AuthorizedRoute>
                  <QuizzesPage />
                </AuthorizedRoute>
              }
              path={QUIZZES_PAGE}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
