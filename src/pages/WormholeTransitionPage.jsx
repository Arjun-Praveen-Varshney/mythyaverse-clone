import { useEffect } from "react";
import Wormhole from "../components/Wormhole/Wormhole";
import { useNavigate, useLocation } from "react-router-dom";
import wormholeAudio from "../assets/audio-effects/wormhole-audio.mp3";

export default function WormholeTransitionPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetLink = searchParams.get("target");
  const navigate = useNavigate();

  const music = new Audio(wormholeAudio);
  music.volume = 0.5;

  useEffect(() => {
    music.play();
    music.loop = false;
    setTimeout(
      () => navigate(`/products?name=${targetLink}`, { replace: true }),
      3000
    );
  }, []);
  return (
    <div className="h-screen w-screen">
      <Wormhole></Wormhole>
    </div>
  );
}
