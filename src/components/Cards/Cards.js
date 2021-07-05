import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import bikeImg from "../../images/transport/bike.png";
import busImg from "../../images/transport/bus.png";
import carImg from "../../images/transport/car.png";
import trainImg from "../../images/transport/train.png";
import "./Cards.css";

const Cards = () => {
  const history = useHistory();
  const handleSetPlace = (id) => {
    const url = `/destination/${id}`;
    history.push(url);
  };
  return (
    <div style={{marginTop: "8em"}} className="container">
      <div className="row">
      <div className="col-md-3 col-sm-6 d-flex justify-content-center mb-4">
        <Card className="card">
          <Card.Img variant="top" className="card-img img-fluid" src={bikeImg} />
          <Card.Body className="card-body">
            <Card.Title className="card-title">BIKE</Card.Title>
            <Button onClick={() => handleSetPlace(1)} className="card-btn">
              Book Your Trip
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-3 col-sm-6 d-flex justify-content-center mb-4">
        <Card className="card">
          <Card.Img variant="top" className="card-img img-fluid" src={carImg} />
          <Card.Body className="card-body">
            <Card.Title className="card-title">CAR</Card.Title>
            <Button onClick={() => handleSetPlace(2)} className="card-btn">
              Book Your Trip
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-3 col-sm-6 d-flex justify-content-center mb-4">
        <Card className="card">
          <Card.Img variant="top" className="card-img img-fluid" src={busImg} />
          <Card.Body className="card-body">
            <Card.Title className="card-title">BUS</Card.Title>
            <Button onClick={() => handleSetPlace(3)} className="card-btn">
              Book Your Trip
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-3 col-sm-6 d-flex justify-content-center mb-4">
        <Card className="card">
          <Card.Img variant="top" className="card-img img-fluid" src={trainImg} />
          <Card.Body className="card-body">
            <Card.Title className="card-title">TRAIN</Card.Title>
            <Button onClick={() => handleSetPlace(4)} className="card-btn">
              Book Your Trip
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default Cards;
