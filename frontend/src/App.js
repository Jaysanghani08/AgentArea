import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Import your Login, Signup, and other components here
import Login from './pages/login_signup/login';
import Signup from './pages/login_signup/signup';

// import Signup from './Signup';
// import AgentDashboard from './AgentDashboard';
// import ClientDashboard from './ClientDashboard';
// import OtherAgentComponent from './OtherAgentComponent';
// import OtherClientComponent from './OtherClientComponent';

function App() {
    const [user, setUser] = useState(null);

    const ClientRoute = ({ element: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            user
                ? <Component {...props} />
                : <Navigate to='/login' />
        )} />
    );

    const AgentRoute = ({ element: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            user && user.role === 'agent'
                ? <Component {...props} />
                : <Navigate to='/login' />
        )} />
    );

    return (
        <>
            <Routes>
                <Route path="/login" element={Login} />
                <Route path="/signup" element={Signup} />
                {/* <ClientRoute path="/client/dashboard" component={ClientDashboard} />
                    <ClientRoute path="/client/other" component={OtherClientComponent} />
                    <AgentRoute path="/agent/dashboard" component={AgentDashboard} />
                    <AgentRoute path="/agent/other" component={OtherAgentComponent} /> */}
            </Routes>
        </>
    );
}

export default App;