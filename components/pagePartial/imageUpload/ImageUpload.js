import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Icon, Upload, message, Spin } from 'antd';

import './ImageUpload.scss';
import notification from '../../../utils/services/alert';

const ImageUpload = ({ saveUrl, url, user }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const uploadButton = (
    <div>
      <Icon type='plus' />
    </div>
  );

  const _handleChange = async (info) => {
    if (!user) {
      notification.error('Please login to upload images!');
    } else {
      setLoading(true);
      const storage = firebase.storage();
      const fileRef = await storage
        .ref('/')
        .child(`content/attachments/${new Date().getTime()}`)
        .put(info.file, {
          contentType: info.file.type
        })
        .then((res) => {
          return res.ref.getDownloadURL().then((url) => url);
        })
        .catch((ex) => {
          console.log('ex', ex);
        });
      if (fileRef) {
        saveUrl(fileRef);
        setImageUrl(fileRef);
      } else {
        notification.error('Fail to upload image.');
      }
      setLoading(false);
    }
  };

  return (
    <div className='cmp-image-upload'>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={_handleChange}
        disabled={imageUrl ? true : false}>
        {loading ? (
          <Spin />
        ) : imageUrl ? (
          <img src={imageUrl} alt='avatar' />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};
const mapStateToProps = ({ UserReducer }) => ({
  user: UserReducer.User
});

const connectedComponent = connect(mapStateToProps, null)(ImageUpload);

export { connectedComponent as ImageUpload };
