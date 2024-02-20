import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './helpers/ProtectedRoute.js';

// Import your Login, Signup, and other components here
import Login from './pages/login_signup/login';
import Signup from './pages/login_signup/signup';
import Home from './pages/home/home.jsx';
import AddAgent from './pages/add_agent.jsx';
import AgentProfile from './pages/agentProfile.jsx';
import AddCompany from './pages/company/add_company.jsx';
import AgentList from './pages/admin/agentList.jsx';
import Company_list from './pages/company/company_list.jsx';
import Tmp from './pages/tmp.jsx';
import AddAgency from './pages/agency/add_agency.jsx';
import AddProduct from './pages/product/add_product.jsx';
import AddPolicy from './pages/policy/add_policy.jsx';
import GetPolicy from './pages/policy/getPolicy.jsx';
import Links from './pages/admin/Links.js';
import { AuthProvider } from './context/AuthContext.js';
import AgentLinks from './pages/agent/AgentLinks.jsx';

// import Signup from './Signup';
// import AgentDashboard from './AgentDashboard';
// import ClientDashboard from './ClientDashboard';
// import OtherAgentComponent from './OtherAgentComponent';
// import OtherClientComponent from './OtherClientComponent';



function App() {
    const [user, setUser] = useState(sessionStorage.getItem('user') || null);

    return (
        // <>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Links />} />
                <Route path='/home' element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route path="addpolicy" element={<AddPolicy />} />
                <Route path='admin' >
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route index element={<Links />} />
                    <Route path="addagent" element={<AddAgent />} />
                    <Route path="agentProfile" element={<AgentProfile />} />
                    <Route path="agentlist" element={<AgentList />} />
                    <Route path="addcompany" element={<AddCompany />} />
                    <Route path="companylist" element={<Company_list />} />
                    <Route path="addagency" element={<AddAgency />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="addpolicy" element={<AddPolicy />} />
                    <Route path="getpolicy" element={<GetPolicy />} />
                    <Route path="tmp" element={<Tmp />} />
                </Route>
                <Route path='agent' >
                    <Route index element={<AgentLinks />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="addagent" element={<AddAgent />} />
                    <Route path="agentProfile" element={<AgentProfile />} />
                    <Route path="agentlist" element={<AgentList />} />
                    <Route path="addcompany" element={<AddCompany />} />
                    <Route path="companylist" element={<Company_list />} />
                    <Route path="addagency" element={<AddAgency />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="addpolicy" element={<AddPolicy />} />
                    <Route path="getpolicy" element={<GetPolicy />} />
                    <Route path="tmp" element={<Tmp />} />
                </Route>
                {/* <ClientRoute path="/client/dashboard" component={ClientDashboard} />
                    <ClientRoute path="/client/other" component={OtherClientComponent} />
                    <AgentRoute path="/agent/dashboard" component={AgentDashboard} />
                    <AgentRoute path="/agent/other" component={OtherAgentComponent} /> */}
            </Routes>
        </AuthProvider>
        // </>
    );
}

export default App;