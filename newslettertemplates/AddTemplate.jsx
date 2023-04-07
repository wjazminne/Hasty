import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import { addTemplate, updateTemplate } from '../../services/newsletterTemplatesService';
import { templateSchema } from '../../schemas/newsletterSchema';
import toastr from 'toastr';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './newslettertemplate.css';
import FileUploader from '../files/FileUploader';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const _logger = debug.extend('AddTemplates');

function AddTemplate() {
  const navigate = useNavigate();
  const { state } = useLocation();
  _logger(state);

  const [templateFormData, setTemplateFormData] = useState({
    name: '',
    description: '',
    primaryImage: '',
  });

  useEffect(() => {
    if (state?.type === 'NEWSLETTER_TEMPLATE_STATE') {
      setTemplateFormData((prevState) => {
        let newtemplateFormData = { ...prevState };
        newtemplateFormData = {
          ...state.values,
        };
        return newtemplateFormData;
      });
    }
  }, []);

  const onAddTemplateSuccess = (response) => {
    _logger(response, 'adding template');
    setTemplateFormData((prevState) => {
      const newId = { ...prevState };
      newId.id = response.item;
      return newId;
    });
    toastr.success('Newsletter Template Added');
    _logger(response);
  };

  const onAddTemplateError = (error) => {
    toastr.error(error.message, 'Newsletter Template Not Added');
  };

  const onSubmitClicked = (values) => {
    _logger(values);

    if (!templateFormData.id) {
      _logger('add is firing');
      addTemplate(values).then(onAddTemplateSuccess).catch(onAddTemplateError);
    } else {
      _logger('update is firing', templateFormData.id);
      updateTemplate(templateFormData.id, values).then(onUpdateTemplateSuccess).catch(onUpdateTemplateError);
      navigate(`/newslettertemplates/`);
    }
  };

  const onUpdateTemplateSuccess = (response) => {
    toastr.success('Successfully Updated Template');
    _logger('Success on Update', response);
  };

  const onUpdateTemplateError = (err) => {
    toastr.error('Newsletter Template Not Updated');
    _logger('Error', err);
  };
  const parentHandleSingleUploadSuccess = (response, setFieldValue) => {
    _logger(response.items);
    setFieldValue('primaryImage', response.items[0].url);
    setTemplateFormData((prevState) => {
      const currentData = { ...prevState };
      let newData = currentData;
      newData.primaryImage = response.items[0].url;
      return newData;
    });
    _logger(templateFormData.primaryImage);
  };

  return (
    <Container>
      <Row className="mx-auto w-50">
        <Col>
          <Card>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: templateFormData.name,
                  description: templateFormData.description,
                  primaryImage: templateFormData.primaryImage,
                }}
                validationSchema={templateSchema}
                onSubmit={onSubmitClicked}>
                {({ setFieldValue }) => {
                  return (
                    <Form>
                      <h5 className="mb-3">New Template Form</h5>
                      <div className="mb-3 row">
                        <div className="col-lg-6">
                          {!templateFormData.primaryImage ? (
                            <strong>Upload your template image here!</strong>
                          ) : (
                            <div className="row">
                              <img alt="" src={templateFormData.primaryImage} className="news-newsletter-images"></img>
                            </div>
                          )}
                          <FileUploader
                            isMultiple={false}
                            handleUploadSuccess={(response) =>
                              parentHandleSingleUploadSuccess(response, setFieldValue)
                            }></FileUploader>
                          <ErrorMessage name="primaryImage" />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label htmlFor="name">Template Name</label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Ex. template for schools"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name="name" />
                      </div>

                      <div className="col-lg-6 mb-3">
                        <label htmlFor="description">Description</label>
                        <Field
                          id="description"
                          name="description"
                          placeholder="Ex. description"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name="description" />
                      </div>
                      <div className="float-start">
                        {!templateFormData.id && (
                          <button type="submit" className="btn btn-secondary float-end mt-2" id="Id" name="Id">
                            Submit
                          </button>
                        )}
                        {templateFormData.id && (
                          <button type="submit" className="btn btn-secondary float-end mt-2" id="Id" name="Id">
                            Edit
                          </button>
                        )}
                      </div>
                      <Link
                        className="link-btn btn btn-secondary mt-2 float-end"
                        type="button"
                        to="/newslettertemplates">
                        Back
                      </Link>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTemplate;
