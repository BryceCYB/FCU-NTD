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
              {/* className="svg-footer" */}
              
              <svg className="svg-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280"><path fill="#f3f4f5" fill-opacity="0.8" d="M0,192L34.3,176C68.6,160,137,128,206,133.3C274.3,139,343,181,411,213.3C480,245,549,267,617,261.3C685.7,256,754,224,823,192C891.4,160,960,128,1029,133.3C1097.1,139,1166,181,1234,197.3C1302.9,213,1371,203,1406,197.3L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
              
              <MainPanel />
            </div>
          </AuthProvider>
        </FirebaseDatabaseProvider>
      </div>
  );
}

export default App;
