// /* eslint-disable module-resolver/use-alias */
// import _ from 'lodash';

// export const getPostalCode = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return (
//       ac.types[0] === 'postal_code' || ac.types[0] === 'postal_code_prefix'
//     );
//   });

//   return results ? results.short_name : '';
// };

// export const getState = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return (
//       ac.types[0] === 'administrative_area_level_1' ||
//       ac.types[0] === 'political'
//     );
//   });

//   return results ? results.long_name : '';
// };

// export const getCity = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return (
//       ac.types[0] === 'administrative_area_level_2' ||
//       ac.types[0] === 'locality'
//     );
//   });

//   return results ? results.long_name : '';
// };

// export const getAddressLine1 = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return (
//       ac.types[0] === 'subpremise' ||
//       ac.types[0] === 'route' ||
//       ac.types[0] === 'premise' ||
//       ac.types[0] === 'sublocality_level_3' ||
//       ac.types[0] === 'sublocality_level_2'
//     );
//   });
//   return results ? results.long_name : '';
// };

// export const getAddressLine2 = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return (
//       ac.types[0] === 'neighborhood' ||
//       ac.types[0] === 'sublocality_level_3' ||
//       ac.types[0] === 'sublocality_level_2' ||
//       ac.types[0] === 'sublocality_level_1'
//     );
//   });
//   return results ? results.long_name : '';
// };

// export const getAddressLine3 = address_components => {
//   let results = _.find(address_components, function(ac) {
//     return ac.types[0] === 'sublocality_level_1';
//   });
//   return results ? results.long_name : '';
// };
import Geocoder from 'react-native-geocoding';
import idx from 'idx';
// import {GOOGLE_MAP_KEY} from 'react-native-dotenv';
// console.log(GOOGLE_MAP_KEY, 'GOOGLE_MAP_KEY');
export const FormattedLocation = async (latitude, longitude, initialSearch) => {
  Geocoder.init('AIzaSyAb8v0MDaUBY_vpHjZW6Jc0Pa98cCYifEo'); // use a valid API key
  let myAddress = await Geocoder.from({latitude, longitude})
    .then(json => {
      let stateName = idx(json, _ =>
        _.results[0].address_components.find(
          o => o.types && o.types[0] == 'administrative_area_level_1',
        ),
      );
      let cityName = idx(json, _ =>
        _.results[0].address_components.find(
          o => o.types && o.types[0] == 'locality',
        ),
      );
      let countryName = idx(json, _ =>
        _.results[0].address_components.find(
          o => o.types && o.types[0] == 'country',
        ),
      );
      let postalCode = idx(json, _ =>
        _.results[0].address_components.find(
          o => o.types && o.types[0] == 'postal_code',
        ),
      );

      return {
        city: cityName,
        formattedAddress: json.results[0].formatted_address,
        state: stateName,
        country: countryName,
        postalCode: postalCode,
      };
    })
    .catch(error => console.warn(error));

  return myAddress;
};

export default FormattedLocation;
