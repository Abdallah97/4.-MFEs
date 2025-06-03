import React from "react";
import "./CardDetails.css";

const CardDetails = (props) => {
    const {image, name, cuisine, rating } = props.data;

    return (
      <div className="card-details">
        <div className="card-details-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-details-info">
          <div className="cuisine">{cuisine}</div>
          <h3 className="item-title">{name}</h3>
          <div className="price">₹200</div>
          <div className="rating">
            <span className="stars">⭐</span>
            <span className="rating-value">{rating}</span>
            <span>(128 reviews)</span>
          </div>
        </div>
      </div>
    );
  }

export default CardDetails;
 
  