import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { PublicRoute, ProtectedRoute } from "./CustomRoutes/CustomRoutes";
import SignIn from "./components/SignIn/SignIn";
import LandingPage from "./layouts/LandingPage";
import Dashboard from "./layouts/Dashboard";

//review-cycle-1: read about styletron and document it somewhere
const engine = new Styletron();

//review-cycle-1: check if there can be a single component only
function App() {
    return (
        <BrowserRouter>
            <StyletronProvider value={engine}>
                <Router>
                    <Switch>
                        <PublicRoute exact path="/" component={LandingPage} />
                        <PublicRoute exact path="/signin" component={SignIn} />
                        <ProtectedRoute
                            path="/dashboard"
                            component={Dashboard}
                        />
                        {/* {Routes beginning with '/dashboard' are private and have to undergo authentication by the backend on refresh } */}
                    </Switch>
                </Router>
            </StyletronProvider>
        </BrowserRouter>
    );
}

export default App;
