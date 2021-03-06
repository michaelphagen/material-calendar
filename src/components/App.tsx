import React from "react";
import "typeface-roboto";
import { Router } from "@reach/router";
import AuthProvider from "./AuthContext";
import SignIn from "./SignIn";
import Calendar from "./Calendar";
import Dashboard from "./admin/Dashboard";

const App = (): JSX.Element => (
  <AuthProvider>
    <Router>
      <SignIn path="/" />
      <Calendar path="/calendar" />
      <Dashboard path="/admin" />
    </Router>
  </AuthProvider>
);

export default App;
