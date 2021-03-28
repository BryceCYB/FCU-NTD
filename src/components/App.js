import '../App.css';
import MainPanel from './MainPanel/MainPanel';
import { AuthProvider } from '../contexts/AuthContext';
import { FirebaseDatabaseProvider } from "@react-firebase/database";

function App() {
  return (
      <div className="App">
        <FirebaseDatabaseProvider>
          <AuthProvider>
            <div className="background">
              <MainPanel />
            </div>
          </AuthProvider>
        </FirebaseDatabaseProvider>
      </div>
  );
}

export default App;
