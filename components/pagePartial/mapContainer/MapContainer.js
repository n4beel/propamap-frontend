import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Row, Col, Form } from "antd";

import "./MapContainer.scss";
import { Button } from "../../html";
import { HorizontalCard } from "../horizontalCard/HorizontalCard";
import { Card } from "../card/Card";
import { SearchLocation } from "../searchLocation/SearchLocation";

import { GetNearByPropertiesAction } from "../../../redux/actions/property";
import { redirect } from "../../../utils/site";

const MapContainer = (props) => {
  const [locations, setLocations] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [defaultLocation, setDefaultLocation] = useState(
    props.defaultLocation || { lat: 3.1412, lng: 101.68653 }
  );
  const [defaultName, setDefaultName] = useState(
    props.defaultName || "Kuala Lampur"
  );
  // Events

  useEffect(() => {
    if (props.defaultLocation) {
      setDefaultLocation(props.defaultLocation);
    }
    if (props.defaultName) {
      setDefaultName(props.defaultName);
    }
  }, [props.defaultLocation, props.defaultName]);

  const _onMarkerClick = (property, marker, e) => {
    if (locations.length === 0) return;
    const currentPlace = locations.filter(
      (value) =>
        value.coord.lon === property.position.lng &&
        value.coord.lat === property.position.lat
    )[0];
    if (currentPlace) {
      setSelectedPlace(currentPlace);
      setActiveMarker(marker);
      setShowInfoWindow(true);
    }
  };

  const _onMapClick = (props) => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker(null);
    }
  };

  // Utils

  const updateDefaultMarker = ({ lat, lng, location: { description } }) => {
    setDefaultLocation({ lat, lng });
    setDefaultName(description);
    searchNearByProperties(lat, lng);
  };

  const searchNearByProperties = async (lat, lng) => {
    let response = await GetNearByPropertiesAction(lat, lng);
    if (response.result) {
      setLocations(response.body);
    }
  };
  console.log("selected -->", selectedPlace);
  return (
    <div className="cmp-map-container">
      {props.showSearch && (
        <div className="map-search-form">
          <Form noValidate>
            <Row gutter={[8, 0]}>
              <Col>
                <SearchLocation onSuccess={updateDefaultMarker} />
              </Col>
            </Row>
          </Form>
        </div>
      )}
      {props.showMapBtn && (
        <div className="show-map-btn">
          <Button title={"Show Map"} block={true} category="primary" />
        </div>
      )}
      <Map
        google={props.google}
        zoom={11}
        center={defaultLocation}
        initialCenter={defaultLocation}
        disableDefaultUI={true}
        onClick={_onMapClick}
      >
        {locations.map((location) => {
          return (
            <Marker
              icon={{
                url: "/images/tag.png",
                scaledSize: new google.maps.Size(90, 40),
              }}
              label={{
                text: `RM ${location.price}`,
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
              }}
              onClick={_onMarkerClick}
              title={location.title}
              position={{ lat: location.coord.lat, lng: location.coord.lon }}
            />
          );
        })}
        <Marker
          icon={{
            url: "/images/mask.png",
            scaledSize: new google.maps.Size(32, 40),
          }}
          draggable={props.draggable}
          onDragend={(t, map, coord) =>
            props.draggable ? props.onDragend(coord) : null
          }
          onClick={_onMarkerClick}
          title={defaultName}
          position={defaultLocation}
        />
        <InfoWindow marker={activeMarker} visible={showInfoWindow}>
          <a href={`/properties/${selectedPlace._id}`}>
            <div className="list-view">
              {!props.showCardOnly ? (
                <HorizontalCard {...selectedPlace} />
              ) : (
                <Card mobileView={true} {...selectedPlace} />
              )}
            </div>
            <div className="mobile-view">
              <Card mobileView={true} {...selectedPlace} />
            </div>
          </a>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapContainer.defaultProps = {
  showSearch: true,
  showCardOnly: true,
  draggable: false,
};

const connectedComponent = GoogleApiWrapper({
  apiKey: "AIzaSyArJOVVmBPjEuYiOyK6UtwvzA72uqghu5A",
})(MapContainer);

export { connectedComponent as MapContainer };
