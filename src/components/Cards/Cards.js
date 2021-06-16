import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import bikeImg from "../../images/transport/bike.png";
import busImg from "../../images/transport/bus.png";
import carImg from "../../images/transport/car.png";
import trainImg from "../../images/transport/train.png";
import "./Cards.css";

const Cards = () => {
  const history = useHistory()
  const handleSetPlace = (id) => {
    const url = `/destination/${id}`;
    history.push(url);
  }
  return (
    <div className="cards">
        <Card className='card'>
          <Card.Img variant="top" className='card-img' src={bikeImg} />
          <Card.Body className='card-body'>
            <Card.Title className='card-title'>BIKE</Card.Title>
            <Button onClick={() => handleSetPlace(1)} className='card-btn'>Book Your Trip</Button>
          </Card.Body>
        </Card>
        <Card className='card'>
          <Card.Img variant="top" className='card-img' src={carImg} />
          <Card.Body className='card-body'>
            <Card.Title className='card-title'>CAR</Card.Title>
            <Button onClick={() => handleSetPlace(2)} className='card-btn'>Book Your Trip</Button>
          </Card.Body>
        </Card>
        <Card className='card'>
          <Card.Img variant="top" className='card-img' src={busImg} />
          <Card.Body className='card-body'>
            <Card.Title className='card-title'>BUS</Card.Title>
            <Button onClick={() => handleSetPlace(3)} className='card-btn'>Book Your Trip</Button>
          </Card.Body>
        </Card>
        <Card className='card'>
          <Card.Img variant="top" className='card-img' src={trainImg} />
          <Card.Body className='card-body'>
            <Card.Title className='card-title'>TRAIN</Card.Title>
            <Button onClick={() => handleSetPlace(4)} className='card-btn'>Book Your Trip</Button>
          </Card.Body>
        </Card>
    </div>
  );
};

export default Cards;
