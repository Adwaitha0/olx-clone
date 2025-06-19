import React ,{useState, useContext} from 'react';


import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  // const history=useHistory()
  const navigate = useNavigate();
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const {firebase}=useContext(FirebaseContext)

  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  //     result.user.updateProfile({displayName:username})
  //     firebase.firestore().collection('users').add({
  //       id:result.user.uid,
  //       username:username,
  //       phone:phone
  //     }).then(()=>{
  //       history.push("/login")
  //     })
  //   })
  // }

  const handleSubmit = (e) => {
  e.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      return result.user.updateProfile({ displayName: username }).then(() => {
        return firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        });
      });
    })
    .then(() => {
      // history.push("/login");
      navigate("/login");
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please use a different email.");
      } else if (error.code === 'auth/invalid-email') {
        alert("Please enter a valid email.");
      } else if (error.code === 'auth/weak-password') {
        alert("Password should be at least 6 characters.");
      } else {
        alert("Signup failed: " + error.message);
      }

      console.error("Signup Error:", error); 
    });
};










  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
      
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
