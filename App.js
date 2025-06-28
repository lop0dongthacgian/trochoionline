import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import GameRoom from './pages/GameRoom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/room/:roomId" component={GameRoom} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;