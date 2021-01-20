import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron,Container} from "react-bootstrap";

function Welcome() {
  return (
    <Container>
    <Jumbotron fluid style={{marginTop:"25px"}}>
      <h1>Login To Continue</h1>
      <p>
        SIGN OUT TO PAST
        LOGIN TO NEW
      </p>
      <p>
        <Link to="/Login">
          <Button>Login</Button>
        </Link>
      </p>
    </Jumbotron>
    </Container>
  );
}

export default Welcome;
