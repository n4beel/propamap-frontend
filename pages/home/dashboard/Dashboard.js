import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import AppLayout from '../../../layouts/AppLayout';

import './styles/Dashboard.scss';

import { PropertyCards } from '../../../components/properties';
import { MapContainer, CardSlider } from '../../../components/pagePartial';
import { SearchForm } from '../../../components/home';

import site from '../../../core/config/sitemap';

const { Title } = Typography;

const Dashboard = () => {
  const [defaultLocation,setLocation] = useState()

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setLocation(pos)
      })
    }
  },[])

  return (
    <div className='page-dashboard'>
      <SearchForm />
      <div className='find-properties'>
        <MapContainer showCardOnly={false} defaultLocation={defaultLocation} />
      </div>
      <div className='recommended-properties'>
        <Title level={4}>Recommended for you</Title>
        <PropertyCards />
      </div>
      <div className='trending-properties'>
        <Title level={4}>Newly Listed</Title>
        <CardSlider showMeta={true} />
      </div>
    </div>
  );
};

Dashboard.getLayout = page => {
  return <AppLayout route={site.routes.dashboard}>{page}</AppLayout>;
};

export default Dashboard;
