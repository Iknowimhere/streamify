import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from './lib/axios';
const App = () => {
  let {
    isLoading,
    error,
    data: authData,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios.get('/auth/me').then((res) => res.data),
    retry: false,
  });
  let user = authData?.user;
  console.log(user);

  return (
    <div
      className='h-screen'
      data-theme='forest'
    >
      <Toaster />

      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <HomePage />
            ) : (
              <Navigate
                to='/login'
                replace
              />
            )
          }
        />
        <Route
          path='/login'
          element={
            !user ? (
              <LoginPage />
            ) : (
              <Navigate
                to='/'
                replace
              />
            )
          }
        />
        <Route
          path='/signup'
          element={
            !user ? (
              <SignupPage />
            ) : (
              <Navigate
                to='/'
                replace
              />
            )
          }
        />
        <Route
          path='/onboarding'
          element={user ? <OnboardingPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/notifications'
          element={user ? <NotificationsPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/chat'
          element={user ? <ChatPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/call'
          element={user ? <CallPage /> : <Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
};
export default App;
