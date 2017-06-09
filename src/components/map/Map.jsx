import React, {PropTypes} from "react"
 
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
 
//import iconMarker from "./assets/iconMarker.svg"
//import iconMarkerHover from "./assets/iconMarkerHover.svg"
 
//import styles from "./index.css"
 
const MY_API_KEY = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
 
const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style. 
  // You have to set the DOM parent height. 
  // So you can perfectly handle responsive with differents heights. 
  <div>
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly. 
      // The map will rerender new markers and remove the old ones. 
      center={{lat: 43.604363, lng: 1.443363}}
      zoom={8}
      onLoaded={(googleMaps, map) => {
        map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
      }}
    />
  </div>
)
 
Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}
 
export default GoogleMapLoader(Map, {
  libraries: ['places'],
  key: MY_API_KEY,
})