import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 34.231188,
  longitude: -118.867469,
  zoom: 13
};

const Map = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <div className="map">
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoiczc3NzYxMCIsImEiOiJjanhjc3VoZHkwNnVrM25udWc4aGplZGl6In0.1bpZyYTxE8hh12MmVvyKiw"
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
      >
        <div className="navigationControl">
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default Map;
