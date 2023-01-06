
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
// import PersonalPage from './pages/PersonalPage';
import Search_Feature from './pages/SearchFeature';
import MovieClassification from './pages/MovieClassification';
import ActorPage from './pages/ActorPage';
import Review from './pages/Review';
import UserPersonal from './pages/UserPersonal';
import PersonalSearch from './pages/PersonalSearch';
import PersonalThoughts from './pages/PersonalThoughts';
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="register" element={<RegisterPage/>} />
      <Route path="login" element={<LoginPage/>} />
      <Route path="login/:id/Search_Feature" element={<Search_Feature/>} />
      <Route path="login/:id/Movie_Classification" element={<MovieClassification/>} />
      <Route path = "login/:id/Review" element = {<Review/>}/>
      <Route path = "login/:id/Search_Feature/:id" element = {<ActorPage/>}/>
      <Route path = "login/:id" element = {<UserPersonal/>}/>
      <Route path = "login/:id/Personal_Search" element = {<PersonalSearch/>}/>
      <Route path = "login/:id/Personal_Thoughts" element = {<PersonalThoughts/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();