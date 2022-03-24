import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPageFlyer from '../UserPageFlyer/UserPageFlyer';
import UserPageShipper from '../UserPageShipper/UserPageShipper';
import InfoPage from '../InfoPage/InfoPage';
import LandingPageFlyer from '../LandingPageFlyer/LandingPageFlyer';
import LandingPageShipper from '../LandingPageShipper/LandingPageShipper';
import DefaultPage from '../DefaultPage/DefaultPage';
import LoginPage from '../LoginPage/LoginPage';
import Itinerary from '../ItineraryPage/ItineraryPage';
import Request from '../RequestPage/RequestPage';
import RequestDetail from '../RequestDetail/RequestDetail';
import ItineraryDetail from '../ItineraryDetail/ItineraryDetail';
import EditRequest from '../EditRequest/EditRequest';
import EditItinerary from '../EditItinerary/EditItinerary';
//import background from '../../photos/background3.jpg'; 

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  ;
  const renderThing = () => {
    console.log("user type", user.type);
    switch(user.type){

      case 'flyer':
        return <Redirect to="/userF" />;
      case 'shipper':
        return <Redirect to="/userS" />;
      case undefined:
        return <LoginPage />
    }

  }

  const renderDefault = () => {
    switch (user.type) {
      case 'flyer':
        return <Redirect to="/userF" />;
      case 'shipper':
        return <Redirect to="/userS" />;
      case undefined:
        return <DefaultPage />
    }
  }


  return (
    <Router>
      <div >
        {/* style={{backgroundImage: `url(${background})`}} 
        inline css for body... put in opening div for return
        */}
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/userF"
          >
            {(user.type === "flyer") ?
                <UserPageFlyer />:
                // Otherwise, redirect to
                <Redirect to="/userS" />
            }
          </ProtectedRoute>
          
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/userS"
          >
            {(user.type === "shipper") ?
              <UserPageShipper /> :
              // Otherwise, redirect to
              <Redirect to="/userF" />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/itinerary"
          >
            {(user.type === "flyer") ?
              <Itinerary /> :
              // Otherwise, redirect to
              <Redirect to="/request" />
            }
            
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/request"
          >
            {(user.type === "shipper") ?
              <Request /> :
              // Otherwise, redirect to
              <Redirect to="/itinerary" />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/request/shipper/:id"
          >
            <RequestDetail />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/request/:id/edit"
          >
            <EditRequest />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/itinerary/:id/edit"
          >
            <EditItinerary />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/itinerary/flyer/:id"
          >
            <ItineraryDetail />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/DefaultPage"
          >
            {renderDefault()}
          </Route>

          <Route
            exact
            path="/login"
          >
            {
              renderThing()
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {
              renderThing()
            }
          </Route>
          <Route
            exact
            path="/landingPageF"
          >
            {
              user.type === 'flyer' ?
                <Redirect to="/userF" />
                :
                // otherwise, show the registration page
                <LandingPageFlyer />
            }
            {/* <LandingPageFlyer /> */}
          </Route>

          <Route
            exact
            path="/landingPageS"
          >
            {
              user.type === 'shipper' ?
                <Redirect to="/userS" />
                :
                // otherwise, show the registration page
                <LandingPageShipper />
            }
            {/* <LandingPageShipper /> */}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
