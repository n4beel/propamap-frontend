import React, { useState, useEffect } from 'react';
import { Card as AntCard, Skeleton } from 'antd';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import './CardSlider.scss';

import { Card } from '../../pagePartial';

import { GetTrendingPropertiesAction } from '../../../redux/actions/property';

const MenuItem = params => (
  <div className={`menu-item`}>
    <Card {...params} slider={true} showMeta={params.showMeta} />
  </div>
);

const Menu = (properties, props) =>
  properties && properties.map((property, key) => (
    <MenuItem {...property} showMeta={props.showMeta} key={key} />
  ));

const CardSlider = props => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(Menu([], props));

  useEffect(() => {
    const didMount = async () => {
      let res = await GetTrendingPropertiesAction();
      if (res.result) {
        setMenu(Menu(res.body, props));
        setLoading(false);
      }
    };
    didMount();
  }, []);

  const _onSelect = key => {
    console.log(key);
  };

  return (
    <div className='cmp-card-slider'>
      {loading ? (
        <AntCard>
          <Skeleton loading={true} avatar active />
        </AntCard>
      ) : (
        <ScrollMenu data={menu} onSelect={_onSelect} alignCenter={false} />
      )}
    </div>
  );
};

export { CardSlider };
