import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import toastr from 'toastr';
import { useLocation } from 'react-router-dom';
import { addNewsletter, updateNewsletter } from '../../services/newslettersService';
import { newslettersSchema } from '../../schemas/newsletterSchema';
import './newsletter.css';
import FileUploader from '../files/FileUploader';
import lookUpService from '../../services/lookUpService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getAll } from '../../services/newsletterTemplatesService';
import DatePicker from 'react-datepicker';

const _logger = debug.extend('AddNewsletter');

function AddNewsletter() {
  const navigate = useNavigate();
  const { state } = useLocation();
  _logger(state);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [templateOptions, setTemplateOptions] = useState([]);

  const [dateToPublish, setDateToPublish] = useState(new Date());

  const [dateToExpire, setDateToExpire] = useState(new Date());

  const [newsletterFormData, setNewsletterFormData] = useState({
    name: '',
    templateId: 0,
    categoryId: 0,
    description: '',
    coverPhoto: '',
    dateToPublish: new Date().toString(),
    dateToExpire: new Date().toString(),
    isSubscribed: false,
  });

  useEffect(() => {
    if (state?.type === 'NEWSLETTER_STATE') {
      _logger(state, 'state');
      setNewsletterFormData((prevState) => {
        let newNewsletterFormData = { ...prevState };
        newNewsletterFormData = {
          ...state.values,
          templateId: 5,
          categoryId: state.values.newsletterCategory.id,
        };
        return newNewsletterFormData;
      });

      setDateToPublish(new Date(state.values.dateToPublish));
      setDateToExpire(new Date(state.values.dateToExpire));
    }

    lookUpService.LookUp(['NewsletterCategories']).then(onLookUpSuccess).catch(onLookUpError);
    getAll().then(onGetTemplateSuccess).catch(onGetTemplateError);
  }, []);

  const onLookUpSuccess = (response) => {
    _logger(response, 'Lookup');
    const onLookUp = response.item.newsletterCategories;

    const mapOption = (category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    };

    setCategoryOptions(onLookUp.map(mapOption));
  };

  const onLookUpError = (error) => {
    toastr.error(error.message, 'Newsletter not found');
  };

  const onGetTemplateSuccess = (response) => {
    _logger(response, 'Template Info');
    const onGetTemplate = response.items;

    const mapTemplateOptions = (template) => {
      return (
        <option key={template.id} value={template.id}>
          {template.name}
        </option>
      );
    };
    setTemplateOptions(onGetTemplate.map(mapTemplateOptions));
  };

  const onGetTemplateError = (error) => {
    toastr.error(error.message, 'Template not found');
  };

  const onAddNewsletterSuccess = (response) => {
    setNewsletterFormData((prevState) => {
      const newId = { ...prevState };
      newId.id = response.data.item;
      return newId;
    });
    toastr.success('Newsletter Added');
    _logger(response);
  };

  const onAddNewsletterError = (error) => {
    toastr.error(error.message, 'Newsletter Not Added');
  };

  const onSubmitClicked = (values) => {
    _logger('submit is firing', values);
    if (!newsletterFormData.id) {
      addNewsletter(values).then(onAddNewsletterSuccess).catch(onAddNewsletterError);
    } else {
      updateNewsletter(newsletterFormData.id, values).then(onUpdateNewsletterSuccess).catch(onUpdateNewsletterError);
      navigate(`/newsletters/`);
    }
  };
  const onUpdateNewsletterSuccess = (response) => {
    toastr.success('Newlsetter Successfully Updated');
    _logger('Success on Update', response);
  };

  const onUpdateNewsletterError = (err) => {
    toastr.error('Newsletter Not Updated');
    _logger('Error', err);
  };

  const parentHandleSingleUploadSuccess = (response, setFieldValue) => {
    _logger(response.items);
    setFieldValue('coverPhoto', response.items[0].url);
    setNewsletterFormData((prevState) => {
      const currentData = { ...prevState };
      let newData = currentData;
      newData.coverPhoto = response.items[0].url;
      return newData;
    });
    _logger(newsletterFormData.coverPhoto);
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
                  dateToPublish: newsletterFormData.dateToPublish.substring(0, 10),
                  name: newsletterFormData.name,
                  templateId: newsletterFormData.templateId,
                  categoryId: newsletterFormData.categoryId,
                  description: newsletterFormData.description,
                  coverPhoto: newsletterFormData.coverPhoto,
                  dateToExpire: newsletterFormData.dateToExpire.substring(0, 10),
                  isSubscribed: newsletterFormData.isSubscribed,
                }}
                validationSchema={newslettersSchema}
                onSubmit={onSubmitClicked}>
                {({ setFieldValue }) => {
                  return (
                    <Form>
                      <h5 className="mb-3">Newsletter Form</h5>
                      <div className="mb-3 row">
                        <div className="col-lg-6">
                          {!newsletterFormData.coverPhoto ? (
                            <strong>Upload your cover image here!</strong>
                          ) : (
                            <div className="row">
                              <img alt="" src={newsletterFormData.coverPhoto} className="news-newsletter-images"></img>
                            </div>
                          )}
                          <FileUploader
                            isMultiple={false}
                            handleUploadSuccess={(response) =>
                              parentHandleSingleUploadSuccess(response, setFieldValue)
                            }></FileUploader>
                          <ErrorMessage name="coverPhoto" />
                        </div>
                      </div>
                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <label htmlFor="name">Newsletter Name</label>
                          <Field id="name" name="name" placeholder="Ex. Name" type="name" className="form-control" />
                          <ErrorMessage name="name" />
                        </div>
                      </div>
                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <label htmlFor="description">Description</label>
                          <Field
                            id="description"
                            name="description"
                            placeholder="Ex. description"
                            type="description"
                            className="form-control"
                          />
                          <ErrorMessage name="description" />
                        </div>
                      </div>
                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <h5 className="mb-3 mt-4"> Select Newsletter Category</h5>
                          <Field name="categoryId" as="select" className="form-control form-select">
                            <option>select option</option>
                            {categoryOptions}
                          </Field>

                          <ErrorMessage name="newsletterCategories" component="div" className="has-error" />
                        </div>
                        <div className="col-6">
                          <h5 className="mb-3 mt-4"> Select Newsletter Template</h5>
                          <Field name="templateId" as="select" className="form-control form-select">
                            <option>select option</option>
                            {templateOptions}
                          </Field>

                          <ErrorMessage name="templateId" component="div" className="has-error" />
                        </div>
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <label htmlFor="dateToPublish">Date To Publish</label>
                          <DatePicker
                            id="dateToPublish"
                            name="dateToPublish"
                            type="date"
                            className="form-control"
                            selected={dateToPublish}
                            onChange={(date) => setFieldValue('dateToPublish', date)}
                          />
                          <ErrorMessage name="dateToPublish" />
                        </div>
                        <div className="col-6">
                          <label htmlFor="dateToExpire">Date To Expire</label>
                          <DatePicker
                            id="dateToExpire"
                            name="dateToExpire"
                            type="date"
                            className="form-control"
                            selected={dateToExpire}
                            onChange={(date) => setFieldValue('dateToExpire', date)}
                          />
                          <ErrorMessage name="dateToExpire" />
                        </div>
                      </div>
                      <div className="col-4">
                        <label htmlFor="isSubscribed">IsSubscribed</label>{' '}
                        <Field id="isSubscribed" name="isSubscribed" type="checkbox" className="form-check-input" />
                        <ErrorMessage name="isSubscribed" />
                      </div>
                      <div className="float-start">
                        {!newsletterFormData.id && (
                          <button type="submit" className="btn btn-secondary float-end mt-2" id="Id" name="Id">
                            Submit
                          </button>
                        )}
                        {newsletterFormData.id && (
                          <button type="submit" className="btn btn-secondary mt-2" id="Id" name="Id">
                            Edit
                          </button>
                        )}
                      </div>
                      <Link className="link-btn btn btn-secondary mt-2 float-end" type="button" to="/newsletters">
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

export default AddNewsletter;
