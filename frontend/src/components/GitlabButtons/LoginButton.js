
const LoginButton = (props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(loginWithRedirect);
    console.log(isAuthenticated);
    return (
        !isAuthenticated && (
            <div id="start-div">
                <h2>Connect to Gitlab</h2>
                <button
                    onClick={() => {
                        loginWithRedirect();
                    }}
                >
                    Log In
                </button>
            </div>
        )
    );
};

export default LoginButton;
