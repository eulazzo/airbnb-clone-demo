import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import { useState } from 'react';
import { getCenter } from 'geolib';

export default function Map({searchResults}) {
 
  const [selectedLocations,setSelectedLocations] = useState({})
 
  const coordinates = searchResults.map(result => ({
    longitude:result.long,
    latitude:result.lat
  }))

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates)
  
  const [viewport, setViewport] =  useState({
    width: '100%',
    height: '100%',
    latitude: (center.latitude - .15),  
    longitude: (center.longitude),
    zoom: 11
});

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/lazzaro/ckufs179w2g2t18p9t4vdlez6'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewPort=>setViewport(nextViewPort)}
    >

      {searchResults.map(result=>(
        <div key={result.long}>
          <Marker
           longitude={result.long}
           latitude={result.lat}
           offsetLeft={-20}
           offsetLeft={-10}
          >
            <p role='img' 
              onClick={()=>setSelectedLocations(result)} 
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
              >📌</p>
          </Marker>

          {/* The popup should show if we click on a marker  */}

          {selectedLocations.long===result.long ? (
            <Popup
             onClose={()=>setSelectedLocations({})}
             closeOnClick={true}
             latitude={result.lat}
             longitude={result.long}
            >
              {result.title}
            </Popup>  
          ):(
            false
          )}
          

        </div>
      ))}



    </ReactMapGL>
  )
}
