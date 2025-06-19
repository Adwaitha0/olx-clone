// import React,{useEffect,useContext} from 'react';
// import './App.css';
// import {BrowserRouter as Router,Route} from 'react-router-dom'
// import Signup from './Pages/Signup'
// import Login from './Pages/Login'
// import Create from './Pages/Create'
// import SearchResults from './Pages/SearchResults';

// import {AuthContext, FirebaseContext} from './store/Context'


// import Home from './Pages/Home';

// function App() {
//   const {setUser}=useContext(AuthContext)
//   const {firebase}=useContext(FirebaseContext)
//   useEffect(()=>{
//     firebase.auth().onAuthStateChanged((user)=>{
//       setUser(user)
//     })
//   },[])
//   return (
//     <div>
//       <Router>
//         <Route exact path='/'>
//         <Home />
//         </Route>

//         <Route path='/signup'>
//         <Signup />
//         </Route>

//          <Route path='/login'>
//         <Login />
//         </Route>
        
//          <Route path='/create'>
//         <Create />
//         </Route>

//         <Route path="/search" component={SearchResults} />



//       </Router>
     
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import SearchResults from './Pages/SearchResults';
import Home from './Pages/Home';
import ViewPost from './Pages/ViewPost';
import MyAdsPage from './Pages/MyAd';


import { AuthContext, FirebaseContext } from './store/Context';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [firebase, setUser]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product-detail" element={<ViewPost />} />
          <Route path="/myads" element={<MyAdsPage />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
