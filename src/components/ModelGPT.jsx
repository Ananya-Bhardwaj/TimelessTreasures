import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Card, CardContent, Typography } from "@mui/material";
import * as modelName from "../assets";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
};

const ModelCard = ({ model, title, subtitle, detail, amount, bids, timeLeft, onButtonClick }) => {
  return (
    <Card
      onClick={onButtonClick}
      style={{
        width: 350,
        margin: "20px auto",
        borderRadius: 20,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div style={{ height: 300, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Model modelPath={modelName[model]} />
          <OrbitControls />
        </Canvas>
      </div>
      <CardContent style={{ padding: "20px" }}>
        <Typography
          variant="h5"
          component="div"
          style={{
            marginBottom: 10,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          style={{
            marginBottom: 10,
            fontStyle: "italic",
            color: "#555",
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ lineHeight: 1.6, color: "#666" }}
        >
          {detail}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{
            marginTop: 15,
            fontWeight: "600",
            color: "#111",
          }}
        >
          {amount}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            marginTop: 5,
            color: "#777",
          }}
        >
          {bids} bids · {timeLeft}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
