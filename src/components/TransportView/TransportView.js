import React from "react";
import peopleIcon from "../../images/icon/peopleicon.png";
import bikeImg from "../../images/transport/bike.png";
import busImg from "../../images/transport/bus.png";
import carImg from "../../images/transport/car.png";
import trainImg from "../../images/transport/train.png";
import "./TransportView.css";

const TransportView = (props) => {
  const { charge, imgURL, transport, id } = props.transport;

  const showTransportImg = (id) => {
    if (Number(id) === 1) {
      return bikeImg;
    }
    if (Number(id) === 2) {
      return carImg;
    }
    if (Number(id) === 3) {
      return busImg;
    }
    if (Number(id) === 4) {
      return trainImg;
    }
  };

  return (
    <div className="transport-view-div">
      <img className="transport-img" src={showTransportImg(id)} alt="" />
      <h3 style={{ margin: "0 1.5vw 0 1.5vw" }}>{transport}</h3>
      <img className="transport-people-icon" src={peopleIcon} alt="" />
      <h4>4</h4>
      <h3 style={{ margin: "0 0 0 3.5vw" }}>{charge}</h3>
    </div>
  );
};

export default TransportView;
