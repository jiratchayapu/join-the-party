import './App.css';
import Register from './views/register/Register'
import LogIn from './views/logIn/LogIn';
import CreateParty from './views/party/CreateParty';
import SearchParty from './views/party/SearchParty';
import MyParty from './views/party/MyParty';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/" element={<LogIn />}></Route>
          <Route exact path="/create-party" element={<CreateParty />}></Route>
          <Route exact path="/parties" element={<SearchParty />}></Route>
          <Route exact path="/my-parties" element={<MyParty />}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
