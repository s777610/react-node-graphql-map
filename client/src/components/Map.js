import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { connect } from "react-redux";
import { createDraft, updateDraftLocation } from "../actions/map";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from "./PinIcon";
import Blog from "./Blog";

const INITIAL_VIEWPORT = {
  latitude: 34.231188,
  longitude: -118.867469,
  zoom: 13
};

const Map = ({ draft, createDraft, updateDraftLocation }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        console.log(`latitude: ${latitude}`);
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!draft) {
      createDraft();
    }
    const [longitude, latitude] = lngLat;

    updateDraftLocation({ longitude, latitude });
  };

  return (
    <div className="map">
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoiczc3NzYxMCIsImEiOiJjanhjc3VoZHkwNnVrM25udWc4aGplZGl6In0.1bpZyYTxE8hh12MmVvyKiw"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        <div className="navigationControl">
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}

        {draft && (
          <Marker
            latitude={draft.latitude}
            longitude={draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}
      </ReactMapGL>

      <Blog />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    draft: state.map.draft
  };
};

export default connect(
  mapStateToProps,
  { createDraft, updateDraftLocation }
)(Map);
