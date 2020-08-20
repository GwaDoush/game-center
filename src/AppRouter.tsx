import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {AuthenticatedUser} from "./context/AuthenticatedContext";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout} from "react-google-login";
import React from "react";


export function AppRouter() {
    return <AuthenticatedUser.Consumer>
        {(userContext) => <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand href="/">Game Center</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Games" id="collasible-nav-dropdown">
                            <Link to="/battleship"><NavDropdown.Item
                                href="/battleship">Battleship</NavDropdown.Item></Link>
                            <NavDropdown.Item disabled>Hangman (soon)</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    {
                        userContext.user ?
                            <Navbar.Text>
                                Signed in as: <Link to="/profile">{userContext.user.name}</Link> <Link to="/logout">(Disconnect)</Link>
                            </Navbar.Text> : <Navbar.Text><Link to="/login">Login</Link></Navbar.Text>
                    }
                </Navbar.Collapse>

            </Navbar>
            <Container>

                <Switch>
                    <Route path="/login">
                        {userContext.user === null ? <Login/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path="/logout">
                        {userContext.user !== null ? <Logout/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path="/battleship">
                        {userContext.user !== null ? <Battleship/> : <Redirect to={"/login"}/>}
                    </Route>
                    <Route path="/profile">
                        {userContext.user !== null ? <Profile/> : <Redirect to={"/login"}/>}
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>

            </Container>
        </Router>
        }
    </AuthenticatedUser.Consumer>;
}

function Home() {
    return <h2>Home</h2>;
}

function Profile() {
    return <div>
        <h2>Profile</h2>
    </div>;
}

const Login = () => <AuthenticatedUser.Consumer>
    {(userContext) =>
        <div>
            <h2>Login</h2>
            <p>Please login with your google account</p>
            <GoogleLogin
                clientId="601543072771-et5trbeu8n554ns5blk0j914274a412o.apps.googleusercontent.com"
                onSuccess={(googleToken: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                    if (googleToken as GoogleLoginResponse) {
                        console.log(googleToken);
                        userContext.login({name: (googleToken as GoogleLoginResponse).profileObj.name})
                    }
                }}
                onFailure={(error: any) => {
                    console.error(error)
                }}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    }
</AuthenticatedUser.Consumer>;


const Logout = () => <AuthenticatedUser.Consumer>
    {(userContext) =>
        <div>
            <h2>Logout</h2>
            <p>Please login with your google account</p>
            <GoogleLogout
                clientId="601543072771-et5trbeu8n554ns5blk0j914274a412o.apps.googleusercontent.com"
                onLogoutSuccess={() => {userContext.logout()}}
            />
        </div>
    }
</AuthenticatedUser.Consumer>;

function Battleship() {
    return <h2>Battlehsip</h2>;
}
