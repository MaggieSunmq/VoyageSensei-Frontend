import React, { useEffect } from 'react';
import Map from '../components/Map';
import ChatBox from '../components/ChatBox';
import Itinerary from '../components/Itinerary';
import { useNavigate } from 'react-router-dom';

function Trip() {
    return (
      <div>
        {/*<h1>Toronto Trip Planner</h1>*/}
        <div className="content">
          <div className="left-panel">
            <ChatBox />
            <Itinerary />
          </div>
          <div className="right-panel">
            <Map />
          </div>
        </div>
      </div>
    );
  }
export default Trip;
