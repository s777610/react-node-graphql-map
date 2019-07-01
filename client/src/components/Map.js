import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import {
  createDraft,
  updateDraftLocation,
  getPinsCreator,
  setPin,
  deletePinCreator,
  createPinCreator,
  createCommentCreator
} from "../actions/map";
import differenceInMinutes from "date-fns/difference_in_minutes";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import { Subscription } from "react-apollo";

import { useClient } from "../graphql/gqlClient";
import { GET_PIN_QUERY } from "../graphql/queries";
import { DELETE_PIN_MUTATION } from "../graphql/mutations";
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION
} from "../graphql/subscriptions";
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
  getPinsCreator,
  setPin,
  currentUser,
  createPinCreator,
  deletePinCreator,
  createCommentCreator
}) => {
  const client = useClient();
  const mobileSize = useMediaQuery("(max-width: 650px)");

  useEffect(() => {
    getPins();
  }, []);

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  // popup is pin
  const [popup, setPopup] = useState(null);

  // remove popup if pin itself is deleted
  useEffect(() => {
    const pinExists =
      popup && pins.findIndex(pin => pin._id === popup._id) > -1;
    if (!pinExists) {
      setPopup(null);
    }
  }, [pins.length]);

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

  const handleSelectPin = pin => {
    setPopup(pin);
    setPin(pin);
  };

  const isAuthUser = () => currentUser._id === popup.author._id;

  const handleDeletePin = async pin => {
    const variables = { pinId: pin._id };

    await client.request(DELETE_PIN_MUTATION, variables);

    setPopup(null);
  };

  return (
    <div className={mobileSize ? "mapMobile" : "map"}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoiczc3NzYxMCIsImEiOiJjanhjc3VoZHkwNnVrM25udWc4aGplZGl6In0.1bpZyYTxE8hh12MmVvyKiw"
        scrollZoom={!mobileSize}
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
              <PinIcon
                onClick={() => handleSelectPin(pin)}
                size={40}
                color={highlightNewPin(pin)}
              />
            </Marker>
          );
        })}

        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img className="popup__image" src={popup.image} alt={popup.title} />
            <div className="popup__tab">
              <Typography>
                {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
              </Typography>
              {isAuthUser() && (
                <Button onClick={() => handleDeletePin(popup)}>
                  <DeleteIcon className="popup__tab__delete" />
                </Button>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>

      {/* Subscriptions for creating / Updating / Deleting Pin */}
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data;

          createPinCreator(pinAdded);
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;

          createCommentCreator(pinUpdated);
          // createPinCreator(pinUpdated);
        }}
      />

      <Subscription
        subscription={PIN_DELETED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinDeleted } = subscriptionData.data;

          deletePinCreator(pinDeleted);
        }}
      />

      <Blog />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    draft: state.map.draft,
    pins: state.map.pins,
    currentUser: state.user.currentUser
  };
};

export default connect(
  mapStateToProps,
  {
    createDraft,
    updateDraftLocation,
    getPinsCreator,
    setPin,
    deletePinCreator,
    createPinCreator,
    createCommentCreator
  }
)(Map);
