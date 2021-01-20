import React, { useState, useEffect } from "react";
import { Card, CardDeck,Container } from "react-bootstrap";

//import Nav from '../component/Navs'


import axios from "axios";

function Colors() {
  const [newdata, setData] = useState("");

  useEffect(() => {
    axios.get("https://reqres.in/api/unknown").then((data) => {
      setData(data.data.data);
    });
  }, []);

  return (
    <>

    <Container>
    <CardDeck style={{marginTop:"20px"}}>
        {newdata &&
          newdata.map((data, index) => (
            <Card className="mb-2"
            style={{ width: '20rem' }} key={index}>
              <Card.Body style={{ backgroundColor: data.color }}>
              <Card.Title >Personal Blog</Card.Title>
                <Card.Text>{data.name}</Card.Text>
                <Card.Text>{data.year}</Card.Text>
                <Card.Text>{data.pantone_value}</Card.Text>
                <Card.Text>{data.color}</Card.Text>
              </Card.Body>
            </Card>
          ))}
           </CardDeck>
           </Container>
    </>
   
  );
}
export default Colors;
