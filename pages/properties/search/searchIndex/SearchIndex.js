import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Typography,
  Divider,
  Pagination,
  Tag,
  Radio,
  Form,
  Icon
} from 'antd';

import AppLayout from '../../../../layouts/AppLayout';

import './styles/SearchIndex.scss';

import {
  MapContainer,
  Card,
  HorizontalCard
} from '../../../../components/pagePartial';

import site from '../../../../core/config/sitemap';
import { QuickSearchForm } from '../../../../components/search';
import { CheckBox, SelectBox } from '../../../../components/html';
import { SearchPropertiesAction } from '../../../../redux/actions/property';

const { Title } = Typography;
const { Group, Button: RadioButton } = Radio;

const SearchIndex = (props) => {
  // const filterOptions = [1, 1, 1, 1, 1];

  const initialForm = {
    // ratingOne: {
    //   title: '1 star',
    //   value: false,
    //   id: 'ratingOne',
    //   onChange: event => _onChangeCheckbox(event)
    // },
    // ratingTwo: {
    //   title: '2 star',
    //   value: false,
    //   id: 'ratingTwo',
    //   onChange: event => _onChangeCheckbox(event)
    // },
    // ratingThree: {
    //   title: '3 star',
    //   value: false,
    //   id: 'ratingThree',
    //   onChange: event => _onChangeCheckbox(event)
    // },
    // ratingFour: {
    //   title: '4 star',
    //   value: false,
    //   id: 'ratingFour',
    //   onChange: event => _onChangeCheckbox(event)
    // },
    // ratingFive: {
    //   title: '5 star',
    //   value: false,
    //   id: 'ratingFive',
    //   onChange: event => _onChangeCheckbox(event)
    // },
    rating: {
      label: 'Rating',
      showLabel: false,
      placeholder: 'Rating',
      value: [],
      searchable: true,
      required: true,
      id: 'rating',
      onChange: (event) => _onChange(event)
    },
    price: {
      label: 'Price',
      showLabel: false,
      placeholder: 'Price',
      value: [],
      searchable: true,
      required: true,
      id: 'price',
      onChange: (event) => _onChange(event)
    }
  };

  const [filterForm, setFilterForm] = useState(initialForm);
  const [properties, setProperties] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState({});

  // Event

  const _onChangeCheckbox = (event) => {
    let newForm = filterForm;
    newForm[event.target.name].value = !event.target.value;
    setFilterForm({ ...newForm });
  };

  useEffect(() => {
    if (props.properties) {
      setProperties(props.properties);
    }
    if (props.options) {
      setTitle(props.options.location.location.description);
      let newForm = query;
      newForm.lat = props.options.location.lat;
      newForm.lon = props.options.location.lng;
      newForm.propertyFor = props.options.propertyFor;
      newForm.propertyType = props.options.propertyType;
      newForm.limit = 7;
      setQuery({ ...newForm });
      setCount(props.count);
    }
  }, [props.properties, props.options]);

  const _onSuccess = (query, res, title) => {
    setQuery(query);
    setTitle(title);
    setProperties(res.body);
    setCount(res.count);
  };

  const _onChangePagination = async (page, pageSize) => {
    let newForm = query;
    newForm.page = page;
    await searchProperty(newForm);
  };

  const searchProperty = async (query) => {
    setLoading(true);
    let res = await SearchPropertiesAction(query);
    if (res.result) {
      setProperties(res.body);
    } else {
      notification.error(res.message || 'Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className='page-search-index'>
      <Row gutter={[24, 24]}>
        <Col xl={6} lg={6} md={24} sm={24}>
          <QuickSearchForm onSuccess={_onSuccess} onLoading={setLoading} />
          <MapContainer showMapBtn={true} showSearch={false} />
          {/* <div className='filter-options'>
            <Title level={4}>Filter by</Title>
            {filterOptions.map(() => (
              <>
                <Divider />
                <label>Star rating</label>
                <div className='rating-options'>
                  <CheckBox {...filterForm.ratingOne} />
                  <b>15</b>
                </div>
                <div className='rating-options'>
                  <CheckBox {...filterForm.ratingTwo} />
                  <b>15</b>
                </div>
                <div className='rating-options'>
                  <CheckBox {...filterForm.ratingThree} />
                  <b>15</b>
                </div>
                <div className='rating-options'>
                  <CheckBox {...filterForm.ratingFour} />
                  <b>15</b>
                </div>
                <div className='rating-options'>
                  <CheckBox {...filterForm.ratingFive} />
                  <b>15</b>
                </div>
              </>
            ))}
          </div> */}
        </Col>
        <Col xl={18} lg={18} md={24} sm={24}>
          <div className='search-list'>
            <Title level={3}>{title}</Title>
            <label>
              {properties && properties.length > 0 ? properties.length : 'No'} properties
              found
            </label>
            <div className='search-list-filter list-view'>
              <Group defaultValue='a' buttonStyle='solid'>
                <RadioButton className='search-list-filter-item' value='a'>
                  Recommended
                </RadioButton>
                {/* <RadioButton className='search-list-filter-item' value='b'>
                  Distance from subway
                </RadioButton> */}
                <Form className='search-list-filter-item'>
                  <SelectBox {...filterForm.rating} size='small' options={[]} />
                </Form>
                <Form className='search-list-filter-item'>
                  <SelectBox {...filterForm.price} size='small' options={[]} />
                </Form>
                {/* <RadioButton className='search-list-filter-item' value='d'>
                  Options
                </RadioButton> */}
              </Group>
            </div>
            <div className='search-list-filter mobile-view'>
              <Group defaultValue='a' buttonStyle='solid'>
                <RadioButton className='search-list-filter-item' value='a'>
                  Recommended
                </RadioButton>
                {/* <RadioButton className='search-list-filter-item' value='b'>
                  Distance from subway
                </RadioButton>
                <RadioButton className='search-list-filter-item' value='d'>
                  Options
                </RadioButton> */}
              </Group>
              <Form className='search-list-filter-dropdown'>
                <SelectBox {...filterForm.rating} size='small' options={[]} />
              </Form>
              <Form className='search-list-filter-dropdown'>
                <SelectBox {...filterForm.price} size='small' options={[]} />
              </Form>
            </div>
            {/* <div className='filter-tags'>
              <Tag closable>
                <b>3 - 5 Rooms</b>
              </Tag>
              <Tag closable>
                <b>5 stars rating</b>
              </Tag>
              <Tag closable>
                <b>150$ - 400$</b>
              </Tag>
            </div> */}
            <Divider />
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <Icon type='loading' style={{ fontSize: 32 }} />
              </div>
            ) : (
              <Fragment>
                {properties.length > 0 ? (
                  properties.map((property, key) => (
                    <Fragment key={key}>
                      <div className='mobile-view'>
                        <Card {...property} />
                        <Divider />
                      </div>
                      <div className='list-view'>
                        <HorizontalCard {...property} />
                        <Divider />
                      </div>
                    </Fragment>
                  ))
                ) : (
                  <p className='not-found'>No result found</p>
                )}
              </Fragment>
            )}
            {properties.length > 0 ? (
              <Pagination
                defaultCurrent={1}
                showTotal={(total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`
                }
                onChange={_onChangePagination}
                total={count}
                pageSize={10}
              />
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  );
};

SearchIndex.getLayout = (page) => {
  return <AppLayout route={site.routes.searchIndex}>{page}</AppLayout>;
};

const mapStateToProps = ({ UserReducer }) => ({
  properties: UserReducer.SearchProperty,
  options: UserReducer.SearchOptions,
  count: UserReducer.SearchCount
});

export default connect(mapStateToProps, null)(SearchIndex);
