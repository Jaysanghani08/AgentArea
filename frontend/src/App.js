import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Import your Login, Signup, and other components here
import Login from './pages/login_signup/login';
import Signup from './pages/login_signup/signup';
import Home from './pages/home/home.jsx';
import AddAgent from './pages/add_agent.jsx';
import AgentProfile from './pages/agentProfile.jsx';
import AddCompany from './pages/add_company.jsx';

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
                <Route path='/' element={<Home />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addagent" element={<AddAgent />} />
                <Route path="/agentProfile" element={<AgentProfile />} />
                <Route path="/addcompany" element={<AddCompany />} />
                {/* <ClientRoute path="/client/dashboard" component={ClientDashboard} />
                    <ClientRoute path="/client/other" component={OtherClientComponent} />
                    <AgentRoute path="/agent/dashboard" component={AgentDashboard} />
                    <AgentRoute path="/agent/other" component={OtherAgentComponent} /> */}
            </Routes>
        </>
    );
}

export default App;