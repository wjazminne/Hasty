import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import debug from 'sabio-debug';
import { addContent } from '../../services/newsletterContentService';
import { contentSchema } from '../../schemas/newsletterSchema';
import { getAllKeysByTemplate } from '../../services/newsletterTemplatesService';
import { Card, Col, Row } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUploader from '../files/FileUploader';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import TemplatePreview from '../newsletter/TemplatePreview';
import toastr from 'toastr';
import './newsletter.css';

const _logger = debug.extend('AddNewsletterContent');

function AddNewsletterContent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  _logger('THIS IS CONTENT LOC:', state);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [contentFormData, setContentFormData] = useState({
    content: [{ keyTypeId: 0, contentValue: '', keyName: '', TemplateKeyId: 0 }],
  });

  useEffect(() => {
    if (state?.type === 'NEWSLETTER_CONTENT_STATE') {
      setContentFormData((prevState) => {
        let newContentFormData = { ...prevState };
        newContentFormData = {
          ...state.values,
        };
        return newContentFormData;
      });
      setSelectedDate(new Date(state.values.selectedDate));
    }
    const templateId = 18;
    getAllKeysByTemplate(templateId).then(onGetTemplateKeySuccess).catch(onGetTemplateKeyError);
  }, []);

  const onGetTemplateKeySuccess = (response) => {
    _logger(response, 'KeyInfo');
    const onGetTemplateKey = response?.items;

    const mapTemplateKeyOptions = (key) => {
      return { ...key, contentValue: '' };
    };
    const testing = onGetTemplateKey?.map(mapTemplateKeyOptions);
    _logger(testing, 'testing');
    setContentFormData((prevState) => {
      const newContentFormData = {
        ...prevState,
        content: onGetTemplateKey?.map(mapTemplateKeyOptions),
      };

      return newContentFormData;
    });
  };

  const onGetTemplateKeyError = (error) => {
    toastr.error(error.message, 'TemplateKey not found');
  };

  const onSubmitClicked = (values) => {
    _logger(values, 'submit is firing');
    const mappedNews = values.content.map((item) => ({
      templateKeyId: item.id,
      keyTypeId: item.KeyTypeId,
      templateId: item.templateId,
      keyName: item.keyName,
      contentValue: item.contentValue,
    }));
    const payload = {
      newsletterId: state.newsletterData.id,
      batchNewsletters: mappedNews,
    };

    addContent(payload).then(onAddContentSuccess).catch(onAddContentError);
    navigate(`/newsletters/`);
  };

  const onAddContentSuccess = (response) => {
    _logger(response, 'testing on add content');
    setContentFormData((prevState) => {
      const cfd = { ...prevState };
      cfd.id = response.content;
      return cfd;
    });
    toastr.success('Content Added');
    _logger(response);
  };

  const onAddContentError = (error) => {
    toastr.error(error.message, 'Content Not Added');
  };

  const getFieldByKeyId = (keyTypeId, content, index, setFieldValue) => {
    _logger(keyTypeId, 'keyId');
    _logger(content, 'content');
    switch (keyTypeId) {
      case 4:
        const imageUrl = content.contentValue;
        return (
          <>
            <FileUploader
              content={imageUrl}
              index={index}
              handleUploadSuccess={(response) => {
                _logger(response.items);
                setFieldValue(`content.${index}.contentValue`, response.items[0].url);
              }}
            />
            {imageUrl && <img src={imageUrl} alt="" className="news-content-images" />}
          </>
        );
      case 5:
        return (
          <CKEditor
            className="form-control"
            editor={ClassicEditor}
            data={content.contentValue}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue(`content.${index}.contentValue`, data);
            }}
          />
        );
      case 7:
        return (
          <ReactDatePicker
            selected={selectedDate}
            className="form-control"
            onChange={(date) => {
              setSelectedDate(date);
              setFieldValue(`content.${index}.contentValue`, date);
            }}
          />
        );
      default:
        return (
          <Field
            type="text"
            className="form-control"
            name={`content[${index}].contentValue`}
            label={`${content.keyName}:`}
          />
        );
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={contentFormData}
        validationSchema={contentSchema}
        onSubmit={onSubmitClicked}>
        {({ values, setFieldValue }) => (
          <Form>
            <Row>
              <Col md={6}>
                <Card className="p-4">
                  <FieldArray name="content">
                    {() => (
                      <div className="row">
                        {values.content.map((content, index) => (
                          <div key={index} className="mb-3 col-md-6">
                            <label className="form-label" htmlFor={`content.${index}.contentValue`}>
                              {`${values.content?.[index]?.keyName}:`}
                            </label>
                            {getFieldByKeyId(content.keyTypeId, content, index, setFieldValue)}
                            <ErrorMessage
                              name={`content.${index}.contentValue`}
                              components="div"
                              className="invalid-feedback"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-secondary float-end mt-2" id="Id" name="Id">
                      Submit
                    </button>

                    <Link className="link-btn btn btn-secondary mt-2 float-end" type="button" to="/newsletters">
                      Back
                    </Link>
                  </div>
                </Card>
              </Col>
              <Col md={6}>
                <TemplatePreview />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddNewsletterContent;
