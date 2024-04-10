import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ThemeContext } from './ThemeContext';

import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./App.css";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import MyMilkcrate from "../../newComponents/userCollection/myMilkcrate";
import SocialPage from "../../newComponents/Social/socialPage";
import SpinSessions from "../../newComponents/SpinSessions/spinSessions";
import Blindbag from "../../newComponents/BlindBag/blindbag";
import AddFriendForm from "../../newComponents/Social/addFriendForm";
import FriendCollection from "../../newComponents/Social/friendCollection";
import AddSpinForm from "../../newComponents/SpinSessions/addSpinForm";
import SingleSpin from "../../newComponents/SpinSessions/singleSpin";
import AddRecordForm from "../../newComponents/userCollection/addRecordForm";
import EditRecordForm from "../../newComponents/userCollection/editRecordForm";
import RecordDetails from "../../newComponents/userCollection/recordDetails";
import TestSite from "../../newComponents/SpinSessions/selectTester";
import HotOffThePress from "../../newComponents/Social/HotOffThePress";
import RecentlySpun from "../../newComponents/Social/RecentlySpun";
// import '@sweetalert2/themes/dark/dark.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user/profile"
          >
            <MyMilkcrate />
          </ProtectedRoute>

          <ProtectedRoute exact path="/user/add">
            <AddRecordForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/user/edit/:id">
            <EditRecordForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/user/details/:recordId">
            <RecordDetails />
          </ProtectedRoute>

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </Route>

          <ProtectedRoute exact path="/social">
            <SocialPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/social/hotp">
            <HotOffThePress />
          </ProtectedRoute>

          <ProtectedRoute exact path="/social/recentlySpun">
            <RecentlySpun />
          </ProtectedRoute>

          <ProtectedRoute exact path="/social/add">
            <AddFriendForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/social/friends/:friendId/:recordId">
            <RecordDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path="/social/friends/:id">
            <FriendCollection />
          </ProtectedRoute>

          <ProtectedRoute exact path="/spins">
            <SpinSessions />
          </ProtectedRoute>

          <ProtectedRoute exact path="/spins/add">
            <AddSpinForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/spins/details/:id">
            <SingleSpin />
          </ProtectedRoute>

          <ProtectedRoute exact path="/blindbag">
            <Blindbag />
          </ProtectedRoute>

          <ProtectedRoute exact path="/test">
            <TestSite />
          </ProtectedRoute>

          {/* <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LandingPage />
            )}
          </Route> */}

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user/profile" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            <LandingPage />
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeContext.Provider>
  );
}

export default App;

