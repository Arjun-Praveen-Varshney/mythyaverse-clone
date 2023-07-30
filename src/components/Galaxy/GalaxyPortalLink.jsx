import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./Galaxy";
import "./style.css";

const GalaxyPortalLink = ({
  productName,
  productID,
  scale,
  colorOne = "#ed124f",
  colorTwo = "#025fdd",
}) => {
  return (
    <Link
      className="canvas-container justify-content-center"
      to={`/transition?target=${productID}`}
    >
      <Canvas className="galaxy-canvas" style={{ margin: "auto" }}>
        <Galaxy scale={scale} colorOne={colorOne} colorTwo={colorTwo} />
      </Canvas>
    </Link>
  );
};

export default GalaxyPortalLink;
