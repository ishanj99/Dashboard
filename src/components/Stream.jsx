import React from "react";

const LiveStream = () => {
  return (
    <div
      style={{
        //position: 'relative',
        width: "100%",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <img
        src="http://192.168.29.139:8080/video"
        style={{
          width: "100%",
          maxWidth: "600px",
          objectFit: "contain",
          marginBottom: 50,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 3,
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
        alt="Live Stream"
      />
    </div>
  );
};

export default LiveStream;
