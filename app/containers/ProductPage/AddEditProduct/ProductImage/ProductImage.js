import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import './style.scss';
import XHRUpload from '@uppy/xhr-upload';
import PropTypes from 'prop-types';
import request from 'utils/request';

const propTypes = {
  token: PropTypes.string,
  images: PropTypes.array,
  onChange: PropTypes.func,
  shoudLoadImage: PropTypes.bool,
};

class ProductImage extends React.PureComponent {
  constructor(props) {
    super(props);

    const { token } = this.props;

    this.uppy = Uppy({
      autoProceed: true,
      restrictions: {
        allowedFileTypes: ['image/*']
      },
      onBeforeUpload: this.onBeforeUpload
    });

    this.uppy.use(XHRUpload, {
      fieldName: 'file',
      endpoint: `${process.env.SERVER_BASE_URL}/image`,
      headers: { Authorization: `Bearer ${token}` }
    });

    this.uppy.on('upload-success', this.onUploadSuccess);
    this.uppy.on('file-removed', this.onRemoved);
  }

  componentDidUpdate(prevProps) {
    const { shoudLoadImage } = this.props;
    if (!prevProps.shoudLoadImage && shoudLoadImage) {
      // load images from server
      this.loadImageUrl()
        .then((imageUrls) => {
          this.renderImage(imageUrls);
        });
    }
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  onBeforeUpload = (files) => {
    const updatedFiles = { ...files };
    Object.keys(updatedFiles).forEach((fileId) => {
      if (updatedFiles[fileId].source === 'from_server') {
        delete updatedFiles[fileId];
      }
    });
    return updatedFiles;
  };

  onUploadSuccess = (file, response) => {
    const { onChange, images } = this.props;

    this.uppy.setFileState(file.id, {
      source: 'from_server',
      temp_id: response.body.file,
      progress: {
        uploadComplete: false,
        uploadStarted: null,
        bytesUploaded: 0,
        percentage: 0
      }
    });

    onChange([...images, response.body.file]);
  };

  onRemoved = (file) => {
    const { onChange, images } = this.props;

    const clonedImages = [...images];
    onChange(clonedImages.filter((item) => item !== file.temp_id));
  };

  loadImageUrl = async () => {
    const { images } = this.props;

    const imageUrls = [];
    images.forEach((image) => {
      imageUrls.push(
        request({
          method: 'GET',
          url: `/image/${image}`
        })
      );
    });

    return Promise.all(imageUrls);
  };

  renderImage = async (imageUrls) => {
    const result = [];

    imageUrls.forEach((imageUrl) => {
      result.push(
        request({
          method: 'GET',
          url: imageUrl.url,
          responseType: 'blob',
        })
      );
    });

    const blobDatas = await Promise.all(result);

    blobDatas.forEach((blobData, index) => {
      const fileId = this.uppy.addFile({
        name: imageUrls[index].name,
        type: blobData.type,
        data: blobData,
        source: 'from_server'
      });

      this.uppy.setFileState(fileId, {
        temp_id: imageUrls[index].file_name,
      });
    });
  };

  render() {
    return (
      <Dashboard
        uppy={this.uppy}
        width={1200}
        hideUploadButton
      />
    );
  }
}

ProductImage.propTypes = propTypes;

export default ProductImage;
