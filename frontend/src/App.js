// libraries
import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
// utilities
import { PublicRoute, ProtectedRoute } from "./routes/Routes";
// components
import Loader from "./components/loaders/Loader";
import LandingPage from "./components/landingPage/index";
// styles

const Dashboard = lazy(() => import("./components/dashboard/index"));

const engine = new Styletron();

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
                    </Switch>
                </Router>
            </StyletronProvider>
        </BrowserRouter>
    );
}

export default App;
