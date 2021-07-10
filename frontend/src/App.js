import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { PublicRoute, ProtectedRoute } from "./customRoutes/CustomRoutes";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

const engine = new Styletron();

function App() {
    return (
        <BrowserRouter>
            <StyletronProvider value={engine}>
                <Router>
                    <Switch>
                        <PublicRoute exact path="/" component={LandingPage} />
                        <ProtectedRoute
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <Redirect path="*" to="/" />
                        {/* {Routes beginning with '/dashboard' are private and have to undergo authentication by the backend on refresh } */}
                    </Switch>
                </Router>
            </StyletronProvider>
        </BrowserRouter>
    );
}

export default App;
