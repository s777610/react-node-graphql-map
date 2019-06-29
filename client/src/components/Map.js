import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { connect } from "react-redux";
import {
  createDraft,
  updateDraftLocation,
  getPinsCreator
} from "../actions/map";
import differenceInMinutes from "date-fns/difference_in_minutes";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import { useClient } from "../graphql/gqlClient";
import { GET_PIN_QUERY } from "../graphql/queries";
import PinIcon from "./PinIcon";
import Blog from "./Blog";

const INITIAL_VIEWPORT = {
  latitude: 34.231188,
  longitude: -118.867469,
  zoom: 13
};

const Map = ({
  draft,
  createDraft,
  updateDraftLocation,
  pins,
  getPinsCreator
}) => {
  const client = useClient();

  useEffect(() => {
    getPins();
  }, []);

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const getPins = async () => {
    const { getPins } = await client.request(GET_PIN_QUERY);

    getPinsCreator(getPins);
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!draft) {
      createDraft();
    }
    const [longitude, latitude] = lngLat;
    updateDraftLocation({ longitude, latitude });
  };

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isNewPin ? "limegreen" : "darknlue";
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

        {pins.map(pin => {
          return (
            <Marker
              key={pin._id}
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <PinIcon size={40} color={highlightNewPin(pin)} />
            </Marker>
          );
        })}
      </ReactMapGL>

      <Blog />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    draft: state.map.draft,
    pins: state.map.pins
  };
};

export default connect(
  mapStateToProps,
  { createDraft, updateDraftLocation, getPinsCreator }
)(Map);
