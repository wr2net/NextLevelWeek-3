import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarkerImg} alt="Happy" />
          </Link>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Dionísio Cerqueira</strong>
          <span>Santa Catarina - Brasil</span>
          <strong>Barracão</strong>
          <span>Paraná - Brasil</span>
          <strong>Bernardo de Irigoyen</strong>
          <span>Missiones - Argentina</span>
        </footer>
      </aside>
      <Map center={[-26.2479351, -53.6393573]} zoom={15} style={{ width: '100%', height: '100%' }} >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/app/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>
      <Link to="/app/orphanages/create" className="create-orphanage">
        <FiPlus size="32" color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap