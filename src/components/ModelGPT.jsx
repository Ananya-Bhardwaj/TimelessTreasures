import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import * as modelName from "../assets"; 

const Model = ({ modelPath }) => {
  console.log("Model Path:", modelPath); // Log the model path

  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
};

const ModelCard = ({ model, title, subtitle, detail, amount, bids, timeLeft, onButtonClick }) => {
  const getKeyByValue = () => {
    for (const key in modelName) {
      if (modelName[key] === model) {
        return key;
      }
    }
  };

  return (
    <>
    <Card style={{ width: 400, margin: "100px auto", borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" , padding :"50px"}}>
      <div style={{ height: 300 }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Model modelPath={modelName[model]} />
          <OrbitControls />
        </Canvas>
      </div>
      <CardContent>
        <Typography variant="h5" component="div" style={{ marginBottom: 10 }}>
          {title}
        </Typography>
        {/* subtitle */}
        <Typography variant="subtitle1" color="text.secondary" style={{ marginBottom: 10 }}>
          {subtitle}
        </Typography>
        {/* description */}
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          {amount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bids} bids · {timeLeft}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary" onClick={onButtonClick}>
          Learn More
        </Button>
      </CardActions> */}
    </Card>
    </>
  );
};

export default ModelCard;
