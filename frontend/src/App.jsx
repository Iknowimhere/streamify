import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';

const App = () => {
  return (
    <div className='h-screen'>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/signup'
          element={<SignupPage />}
        />
        <Route
          path='/onboarding'
          element={<OnboardingPage />}
        />
        <Route
          path='/notifications'
          element={<NotificationsPage />}
        />
        <Route
          path='/chat'
          element={<ChatPage />}
        />
        <Route
          path='/call'
          element={<CallPage />}
        />
      </Routes>
    </div>
  );
};
export default App;
