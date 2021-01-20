import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

const LoginControl = () => {
  //let history = useHistory();

  const [isAuth, setstate] = useState(localStorage.getItem("item"));
   const token=localStorage.getItem("item")
  useEffect(() => {
    setstate(localStorage.getItem("item"));
  }, [token]);
  const logout = () => {
    localStorage.setItem("item", false);
    //history.push("/login");
  };
  return (
    <div>
      {isAuth === "true" && (
        <Link to="/" onClick={logout}>
          Logout
        </Link>
     ) 
    //  :  (
        // <Link to="/">Login</Link>
      // )
    }
    </div>
  );
};
export default withRouter(LoginControl);
