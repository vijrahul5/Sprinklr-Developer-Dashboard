import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { PublicRoute, ProtectedRoute } from "./routes/Routes";
import Loader from "./components/loaders/Loader";
import LandingPage from "./components/LandingPage";

const engine = new Styletron();
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

function App() {
    return (
        <BrowserRouter>
            <StyletronProvider value={engine}>
                <Router>
                    <Switch>
                        <PublicRoute exact path="/" component={LandingPage} />
                        <Suspense
                            fallback={() => {
                                return <Loader />;
                            }}
                        >
                            <>
                            <ProtectedRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            </>
                        </Suspense>
                        <Redirect path="*" to="/" />
                        {/* {Routes beginning with '/dashboard' are private and have to undergo authentication by the backend on refresh } */}
                    </Switch>
                </Router>
            </StyletronProvider>
        </BrowserRouter>
    );
}

export default App;
