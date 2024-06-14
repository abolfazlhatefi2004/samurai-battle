import { useState } from "react";
import pockemonImage from '../../image/Samurai.jpg';
import ContentPlace from './ContentPlace';
import HomeModal from "./HomeModal";


export default function Home() {

    let gameFlag = true;
    (window.screen.width < 1024) && (gameFlag = false);
    return (
        <div className="h-full max-h-full bg-no-repeat bg-cover" style={gameFlag ? { backgroundImage: `url(${pockemonImage})` } : { backgroundColor: '#FFD101' }}>
            {gameFlag ? <ContentPlace /> : <HomeModal />}
        </div>

    );
}