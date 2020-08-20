import React from 'react';
import './App.css';

import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import {Nav, Navbar, NavDropdown, Container} from "react-bootstrap";


interface AppState {
    isSignedIn: boolean
    name: string
}

export default class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isSignedIn: false,
            name: "Anonymous"
        }
    }

    responseGoogle = (response: any) => {
        console.log(response)
        this.setState(
            {
                isSignedIn: true,
                name: response.profileObj.name
            }
        )
    }

    render = () => (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand href="/">Game Center</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Games" id="collasible-nav-dropdown">
                            <Link to="/battleship"><NavDropdown.Item href="/battleship">Battleship</NavDropdown.Item></Link>
                            <NavDropdown.Item disabled>Hangman (soon)</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {
                        this.state.isSignedIn ?
                            <Navbar.Text>
                                Signed in as: <Link to="/profile">{this.state.name}</Link>
                            </Navbar.Text> : <GoogleLogin
                                clientId="601543072771-et5trbeu8n554ns5blk0j914274a412o.apps.googleusercontent.com"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                            />
                    }
                </Navbar.Collapse>
            </Navbar>
            <Container>

                <Switch>
                    <Route path="/battleship">
                        <Battleship/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>

            </Container>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function Profile() {
    return <div>
        <h2>Profile</h2>
        <GoogleLogout
            clientId="601543072771-et5trbeu8n554ns5blk0j914274a412o.apps.googleusercontent.com"
            onLogoutSuccess={() => {console.log("logout")}}
        />
    </div>;
}

function Battleship() {
    return <h2>Battlehsip</h2>;
}