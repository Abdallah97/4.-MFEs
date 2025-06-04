import React from "react";

const LoadingIndicator = ({ type = "spinner", message = "Loading..." }) => {
    if (type === "skeleton") {
        return (
            <div className="skeleton-container">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="skeleton-card">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text" style={{ width: '60%' }}></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">{message}</p>
        </div>
    );
};

export default LoadingIndicator;
