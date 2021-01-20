import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import services from "./Services/services";
import { Button, Form, Row, Spinner } from "react-bootstrap";
// import Loader from "react-spinners/BarLoader";
// import LoadingScreen from "react-loading-screen";

function Login() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [pswd, setPswd] = useState("");
  const [nameerror, setNameError] = useState("");
  const [pswderror, setPswdError] = useState("");
  // const [result, setResult] = useState("");
  const [commerror, setCommError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
//   function isValidLength(pswd) {
//     return (pswd.length < 10);
// }
   const login = () => {
    //json
    const data = {
      email: name,
      password: pswd,
    };
  //  if (name === "" || pswd === "") {
      if (name === "") {
        setNameError("Required**");
      } else if (!validateEmail(name)) {
        setNameError("invalid Email");
      } else {
        setNameError("");
      }
      if (pswd === "") {
        setPswdError("Required**");
      } else if(pswd.length < 6) {
        setPswdError("you have to enter at least 6 digit!");
      } else if(pswd.length > 10){
        setPswdError("Maximum 10");
      } else{
        setPswdError("");
      
      }
  //  } 
    // if(pswd.length < 5){
    //   setPswdError("you have to enter at least 6 digit!");
    // }  
     if (name !== "" && pswd !== "" && pswd.length >= 6 && pswd.length <= 10 ) {
      setLoading(true);
      setPswdError("");
      setNameError("");
      setCommError("");

      services
        .login(data)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("item", true);
            console.log(response);
            setLoading(false);
            setName("");
            setPswd("");
            // setPswdError("");
            // setResult(response.data);
            history.push("/colors");
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          setCommError(error.response.data.error);
          setLoading(false);
        });
    }
  };
  const changeuserName = (event) => {
    setName(event.target.value);
  };
  const changeuserPswd = (event) => {
    setPswd(event.target.value);
  };
  // const Loading = (
  //   <div className="loading">
  //     <div></div>
  //     <div></div>
  //   </div>
  //);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 6000);
  // }, []);
  return (
    <Form>
      <Row className="justify-content-md-center">
        <div className="border w-50 center pb-3" style={{ marginTop: "25px" }}>
          <h1>Login</h1>
          <div>
            {commerror && <p className="text-danger pt-2">{commerror}</p>}
            <Row className="justify-content-md-center">
              <Form.Group controlId="formBasicEmail" className="w-50">
                <Form.Control
                  type="email"
                  value={name}
                  onChange={changeuserName}
                  placeholder="Enter Email"
                />
                {nameerror && (
                  <div className="text-danger text-left">{nameerror}</div>
                )}
              </Form.Group>
            </Row>

            <Row className="justify-content-md-center">
              <Form.Group controlId="formBasicPassword" className="w-50">
                <Form.Control
                  type="password"
                  value={pswd}
                  onChange={changeuserPswd}
                  placeholder="Password"
                />
                {pswderror && (
                  <div className="text-danger text-left">{pswderror}</div>
                )}
              </Form.Group>
            </Row>
            <Row className="justify-content-md-center">
              <>
                {loading ? (
                  <Button
                    className="w-50"
                    variant="success"
                    size="lg"
                    block
                    onClick={login}
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="grow"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    className="w-50"
                    variant="success"
                    size="lg"
                    block
                    onClick={login}
                  >
                    Login
                  </Button>
                )}
              </>
            </Row>

            <Form.Text className="text-muted pt-2">
              Not registered? <Link to="/register">Create new account</Link>
            </Form.Text>
          </div>
        </div>
      </Row>
    </Form>
  );
}
export default Login;
