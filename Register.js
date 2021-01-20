import React, { useState } from "react";
import services from "./Services/services";
import { Link } from "react-router-dom";
import { Form, Row, Button,Spinner } from "react-bootstrap";
//import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [pswd, setPswd] = useState("");
  const [nameserror, setNamesError] = useState("");
  const [pswdserror, setPswdsError] = useState("");
  const [commerror] = useState("");
  const [setResult] = useState("");
  const[loading,setLoading]=useState(false)

  const submit = () => {
    //json
    const data = {
      email: name,
      password: pswd,
    };
    if (name === "") {
      setNamesError("Enter valid Email ");
      
    } else {
      setNamesError("");

    }
    if (pswd === "") {
      setPswdsError("Enter valid password ");
    } else {
      setPswdsError("");
    }
  
    if (nameserror && pswdserror) {
      setLoading(true)
      services.create(data).then((Response) => {
        console.log(Response.message)
        if (Response.status === 200) {
          setLoading(false)
          setName("");
          setPswd("");
          setResult(Response.data);
        } 
      })
    
      .catch(function (error) {
        // console.log(error.response.data.error);
       // setCommError(error.response.data.error);
        setLoading(false);
      });
    }
  }
  
  const changeName = (event) => {
    setName(event.target.value);
  };
  const changePswd = (event) => {
    setPswd(event.target.value);
    
  };
  
  return (
    <Form>
      <Row className="justify-content-md-center">
        <div
          className="border w-50 center"
          style={{marginTop:"20px"}}
        >
          <h1>Register</h1>
          <div>
              {commerror && <p className="text-danger">{commerror}</p>}
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicEmail" className="w-50">
                  <Form.Control
                    type="email"
                    value={name}
                    onChange={changeName}
                    placeholder="Enter Email"
                  />
                  {nameserror && (
                    <div className="text-danger text-left">{nameserror}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicPassword" className="w-50">
                  <Form.Control
                    type="password"
                    value={pswd}
                    onChange={changePswd}
                    placeholder="Password"
                  />
                  {pswdserror && (
                    <div className="text-danger text-left">{pswdserror}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="justify-content-md-center pb-2">
              <>
                {loading ? (
                 <Button className="w-50"
                 variant="success" size="lg"
                  block onClick={submit} disabled>
                     <Spinner
                       as="span"
                       animation="grow"
                       size="sm"
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
                    onClick={submit}
                  >
                    Register
                  </Button>
                )}
              </>
              </Row>
              <Form.Text className="text-muted pt-2">
              Have already an account? <Link to="/login">Login</Link>
            </Form.Text>
            </div>
          </div>
      </Row>
    </Form>
  );
}
export default Register;
