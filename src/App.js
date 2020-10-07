import React, { useState, useEffect } from "react";
import axios from "axios";


// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
 
  const [authors, setAuthors] = useState([]);
 
  const [loading, setLoading] = useState(true)

  const unselectAuthor = () => setCurrentAuthor(null);

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = async () => {
    try{
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/")
      console.log(response.data)
      setAuthors(response.data)
      setLoading(false)
    } catch(error){
      console.log("error!")
      console.error(error)
    }
  };

  const selectedAuthor = async (author) => {
    try{
      setLoading(true)
      const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`)
      setCurrentAuthor(response.data)
      setLoading(false)
    } catch(error){
      console.log("error!")
      console.error(error)
    }
  };

  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {

      if (loading){
        return <h2>Loading...</h2>
      } else {
          return <AuthorList authors = {authors} selectAuthor = {selectedAuthor} />;
      }
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
