// import logo from './logo.svg';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
// import AboutLeftMenu from './components/AboutLeftMenu'
import Middle from './components/Middle';

function App() {
  return (
    <Router>
    <div className="App">
       <Header path={Router}/>
       <Middle />
    </div>
    </Router>
  );
}

export default App;
