import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import data from "../../data/data.json";
import mapImg from "../../images/map/Map.png";
import Header from "../Header/Header";
import TransportView from "../TransportView/TransportView";
import "./Destinations.css";

const Destination = () => {
  const { tripCode } = useParams();
  const [transport, setTransport] = useState({});
  const [destinationCorrect, setDestinationCorrect] = useState(false);

  let pickFrom;
  let pickTo;
  const handleDestinationBlur = (e) => {
    if (e.target.name === "pickFrom") {
      pickFrom = e.target.value;
    }
    if (e.target.name === "pickTo") {
      pickTo = e.target.value;
    }
  };

  const handleDestinationSubmit = (e) => {
    if (pickFrom && pickTo) {
      const transportSetup = data.find((each) => each.id === Number(tripCode));
      setTransport(transportSetup);
      setDestinationCorrect(true);
    }
    e.preventDefault();
  };
  return (
    <section className="body-image">
      <Header></Header>

      {Number(tripCode) === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem", color: "tomato" }}>
          Please book your trip first...
        </h1>
      ) : (
        <div className="destination">
          <div className="destination-login-form-and-transport-view">
            <div className="destination-login-form-div">
              <Form onSubmit={handleDestinationSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">Pick From</Form.Label>
                  <Form.Control
                    onBlur={handleDestinationBlur}
                    name="pickFrom"
                    type="text"
                    placeholder="Mirpur"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">Pick To</Form.Label>
                  <Form.Control
                    onBlur={handleDestinationBlur}
                    className="destination-from-input-width"
                    name="pickTo"
                    type="text"
                    placeholder="Dhaka"
                    required
                  />
                </Form.Group>

                <Button
                  className="login-btn"
                  style={{
                    backgroundColor: "#ec2840",
                    border: "none",
                    borderRadius: "2em",
                    padding: "0.5em 2em",
                    fontSize: "1.2em",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
            {destinationCorrect && <TransportView transport={transport}></TransportView>}
            {destinationCorrect && <TransportView transport={transport}></TransportView>}
            {destinationCorrect && <TransportView transport={transport}></TransportView>}
          </div>
          <div className="map-img-div">
          <img className="destination-map" src={mapImg} alt="map"></img>
          </div>
        </div>
      )}
    </section>
  );
};

export default Destination;
