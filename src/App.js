import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// Login pages
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import AdminLog from './components/pages/AdminLog'
import Register from './components/pages/Register'
import AdminRegister from './components/pages/AdminReg'

// Main Page & Nav
import Navbar from './components/partials/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'
import Welcome from './components/pages/Welcome'

// Tournament Pages
import NewTournament from './components/pages/NewTournament'
import Tournament from './components/pages/Tournament'
import Tournaments from './components/pages/Tournaments'
import EditTournament from './components/pages/EditTournament'
import Submission from './components/pages/Submission'
import Submissions from './components/pages/Submissions'
import EditSubmission from './components/pages/Submission'
import EditComment from './components/pages/EditComment'
// import Search from './components/pages/Search'

// Profiles
import Profile from './components/pages/Profile'
import EditProfile from './components/pages/EditProfile'
import AdminProfile from './components/pages/AdminProfile'
import EditAdminProfile from './components/pages/EditAdminProfile'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('jwt')? jwt_decode(localStorage.getItem('jwt')): null)

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} /> }
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/adminreg"
            element={<AdminRegister currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/admin"
            element={<AdminLog currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />


          {/* conditionally render auth locked routes */}
          <Route
            path="/tournaments"
            element={<Tournaments currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />
           <Route 
            path="/tournaments/new"
            element={currentUser ? <NewTournament currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to="/login" />}
          />
           <Route 
            path="/tournaments/:id"
            element={<Tournament currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
          />

           <Route 
            path="/tournaments/:id/edit"
            element={currentUser ? <EditTournament /> : <Navigate to="/login
            " />}
          />
           <Route 
            path="/tournaments/:id/submission"
            element={currentUser ? <Submission /> : <Navigate to="/login
            " />}
          />
           <Route 
            path="/tournaments/:id/submission/:subid"
            element={currentUser ? <EditSubmission /> : <Navigate to="/login
            " />}
          />
           <Route 
            path="/tournaments/:id/submissions"
            element={currentUser ? <Submissions /> : <Navigate to="/login
            " />}
          />
          <Route 
            path="/tournaments/:id/comments/:commentid/edit"
            element={currentUser ? <EditComment /> : <Navigate to="/login" />}
          />
          <Route 
            path="/:username"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login
            " />}
          />
           <Route 
            path="/:username/edit"
            element={currentUser ? <EditProfile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to="/login
            " />}
          />
          <Route 
            path="/admin/:username"
            element={currentUser ? <AdminProfile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login
            " />}
          />
           <Route 
            path="/admin/:username/edit"
            element={currentUser ? <EditAdminProfile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to="/login
            " />}
          />
           {/* <Route 
            path="/search"
            element={currentUser ? <Search /> : <Navigate to="/login

            " />}
          />
           <Route 
            path="/*"
            element={<Navigate to="/" />}
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
