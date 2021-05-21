
import '../../App.css';
// import React from "react";
import AppBar from '../AppBar';
import Wes from '../wes'
import Books from '../Books/index'
import BookInvoice from '../Books/bookInvoice'
import bookData from "../../API BOOK";
import Whiteboard from "../whiteboard";
import Page1 from"../unit info";
// import Parent from "../parentToChild/parent";
// import Child from "../parentToChild/child";
import AddUser from "../admin/AddUser";
import Addlibrarian from "../admin/Addlibrarian";

import Parent from "../Books/bookParent'";
import Child from "../Books/bookChild";

import React, { Fragment, useState, useEffect } from "react";
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// import SignInOutContainer from "../Login&Register/index";
import Login from "../login/index";
import Register from "../register/index";
import Dashboard from "../Dashboard/index";
import Admin from "../admin/index";
import Lecturer from "../admin/lecturer";
import librarian from "../admin/libarian";
import Student from "../admin/student";
import EditStudent from "../admin/EditUser";
import Librarian from "../admin/libarian";

//
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
toast.configure();


//
function App() {
    const [isAuthenticated, setIsAutenticated] = useState(false);
    const setAuth = (boolean) => {
        setIsAutenticated(boolean);
    }

    async function isAuth(){
        try{
            const  response = await fetch(
                "http://localhost:3001/is-verify",
                {
                    method : "GET",
                    headers : {token: localStorage.token}
                }
            )
            const parseRes = await response.json();
            console.log(parseRes);
            parseRes === true ? setIsAutenticated(true) : setIsAutenticated(false)
        }catch (e) {
            console.log(e)

        }
    }

    useEffect(()=>{
        isAuth()
    })
  return (
      <Fragment>
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/" render={props =>
                          !isAuthenticated ?
                              (<Login {...props} setAuth={setAuth}/>) : (<Redirect to="/dashboard"/>)
                      }/>
                      <Route exact path="/login" render={props =>
                          !isAuthenticated ?
                              (<Login {...props} setAuth={setAuth}/>) : (<Redirect to="/dashboard"/>)
                      }/>
                      <Route exact path="/register" render={props =>
                          !isAuthenticated ?
                              (<Register {...props} setAuth={setAuth}/>) : (<Redirect to="/login"/>)
                      }/>
                      <Route exact path="/dashboard" render={props =>
                          isAuthenticated ?
                              (<Dashboard {...props} setAuth={setAuth}/>) : (<Redirect to="/"/>)
                      }/>


                      <Route exact path="/admin" render={props =>
                          <Admin {...props} />
                      }/>
                      <Route exact path="/admin-student" render={props =>
                          <Student {...props} />
                      }/>
                      <Route exact path="/admin-librarian" render={props =>
                          <Librarian {...props} />
                      }/>


                      <Route exact path="/whiteboard" render={props =>
                          <Whiteboard {...props} />
                      }/>

                      <Route exact path="/FIT1010" render={props =>
                          <Page1 {...props} />
                      }/>

                      <Route exact path="/library" render={props =>
                          <Books {...props} />
                      }/>
                      <Route exact path="/WES" render={props =>
                          <Wes {...props} />
                      }/>
                      <Route exact path="/books" render={props =>
                          <Child {...props} />
                      }/>

                      <Route exact path="/parent" render={props =>
                          <Parent {...props} />
                      }/>
                      <Route exact path="/child" render={props =>
                          <Child {...props} />
                      }/>
                      <Route exact path="/student-user" render={props =>
                          <AddUser {...props} />
                      }/>
                      <Route exact path="/librarian-user" render={props =>
                          <Addlibrarian {...props} />
                      }/>







                  </Switch>
              </div>
          </Router>
      </Fragment>

  );
}

// export default App;

export default App;
