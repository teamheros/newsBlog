import './App.css';
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import Blogs from './component/Blogs'
import { selectSignedIn } from './features/userSlice';
import {useSelector} from 'react-redux';

function App() {

  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="App">
       <h1>News Web App</h1>
       <Navbar />
       <Homepage />
       {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
