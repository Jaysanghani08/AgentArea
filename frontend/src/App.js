import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';

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
import GetPolicy from './pages/policy/policy_list.jsx';
import Links from './pages/admin/Links.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import AgentLinks from './pages/agent/AgentLinks.jsx';
import Cookies from 'js-cookie';
import AgencyList from './pages/agency/agency_list.jsx';
import ProductList from './pages/product/product_list.jsx';
import PolicyList from './pages/policy/policy_list.jsx';
import PolicyDetail from './pages/policy/policy_detail.jsx';
import ForgetPassword from './pages/login_signup/ForgetPassword.jsx';
import CustomerLogin from './pages/login_signup/CustomerLogin.jsx';
import UpdatePassword from './pages/login_signup/UpdatePassword.jsx';

function App() {
    const user = JSON.parse(Cookies.get('user') || 'null');
    console.log(user);

    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route path="addpolicy" element={<AddPolicy />} />
                <Route path='admin' >
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route index element={<Links />} />
                    <Route path="addagent" element={<AddAgent />} />
                    <Route path="agentProfile/:agentid" element={<AgentProfile />} />
                    <Route path="agentlist" element={<AgentList />} />
                    <Route path="addcompany" element={<AddCompany />} />
                    <Route path="companylist" element={<Company_list />} />
                    <Route path="addagency" element={<AddAgency />} />
                    <Route path='agencylist/:companyid' element={<AgencyList />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="productlist/:agencyid" element={<ProductList />} />
                    <Route path="addpolicy" element={<AddPolicy />} />
                    <Route path="policylist" element={<PolicyList />} />
                    <Route path="policy/:id" element={<PolicyDetail />} />
                    <Route path="tmp" element={<Tmp />} />
                </Route>
                <Route path='agent' >
                    <Route index element={<AgentLinks />} />
                    <Route path="home" element={<AgentLinks />} />
                    <Route path="updatePassword/:mobile" element={<UpdatePassword />} />
                    <Route path="forgetpassword" element={<ForgetPassword />} />
                    <Route path="login" element={<Login />} />
                    <Route path="addagent" element={<AddAgent />} />
                    <Route path="agentProfile/:agentid" element={<AgentProfile />} />
                    <Route path="agentlist" element={<AgentList />} />
                    <Route path="addcompany" element={<AddCompany />} />
                    <Route path="companylist" element={<Company_list />} />
                    <Route path="addagency" element={<AddAgency />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="addpolicy" element={<AddPolicy />} />
                    {/* polict list path below */}
                    <Route path="getpolicy" element={<GetPolicy />} /> 
                    <Route path="policy/:id" element={<PolicyDetail />} />
                    <Route path="tmp" element={<Tmp />} />
                </Route>

                <Route path='customer' >
                    {/* <Route path="signup" element={<Signup />} /> */}
                    <Route path="login" element={<CustomerLogin />} />
                    <Route path='policylist' element={<PolicyList />} />
                    <Route path='policy/:id' element={<PolicyDetail />} />
                </Route>

                <Route path='*' element={<Navigate to="/home" />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;