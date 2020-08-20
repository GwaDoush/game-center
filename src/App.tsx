import React from 'react';
import './App.css';
import {UserProvider} from "./context/AuthenticatedContext";
import {AppRouter} from "./AppRouter";

class App extends React.Component {

    render = () => <UserProvider>
        <AppRouter/>
    </UserProvider>;

}

export default App