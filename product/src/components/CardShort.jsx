import React from "react";
import "./CardShort.css";

const CardShort = (props) => {
    const {image, name} = props.data;
    return (
      <div className="card">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-content">
          <h3 className="title">{name}</h3>
        </div>
      </div>
    );
  }

export default CardShort;
