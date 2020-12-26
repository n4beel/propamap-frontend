import React from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng
} from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';

const SearchLocation = props => {
  // Events

  const _onSelectLocation = async location => {
    await geocodeByPlaceId(location.place_id)
      .then(async results => {
        return await getLatLng(results[0]);
      })
      .then(async ({ lat, lng }) => {
        if (props.onSuccess) props.onSuccess({ lat, lng, location });
      });
  };

  return (
    <div className='cmp-search-location'>
      <GooglePlacesAutocomplete
        initialValue={props.initialValue}
        onSelect={_onSelectLocation}
      />
    </div>
  );
};

export { SearchLocation };
