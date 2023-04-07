import React, { useEffect, useState } from 'react';
import { getByNewsletterId } from '../../services/newsletterContentService';
import { Container, Row, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const _logger = debug.extend('NewsletterPreview');

function NewsletterPreview() {
  const location = useLocation();
  _logger(location.state);

  const [newsletterContent, setNewsletterContent] = useState({});

  const newsletterId = location.state.newsletterData;
  useEffect(() => {
    if (newsletterId && newsletterId > 0) {
      getByNewsletterId(newsletterId).then(onGetNewsletterIdSuccess).catch(onGetNewsletterIdError);
    }
  }, []);

  const onGetNewsletterIdSuccess = (response) => {
    setNewsletterContent(response.items);
    _logger(response);
  };

  const onGetNewsletterIdError = (error) => {
    _logger(error);
  };

  const cleanPreview = DOMPurify.sanitize(newsletterContent?.[0]?.value);
  const cleanPreview1 = DOMPurify.sanitize(newsletterContent?.[1]?.value);
  const cleanPreview2 = DOMPurify.sanitize(newsletterContent?.[2]?.value);
  const cleanPreview3 = DOMPurify.sanitize(newsletterContent?.[3]?.value);
  const cleanPreview4 = DOMPurify.sanitize(newsletterContent?.[4]?.value);
  const cleanPreview5 = DOMPurify.sanitize(newsletterContent?.[5]?.value);
  const cleanPreview6 = DOMPurify.sanitize(newsletterContent?.[6]?.value);
  const cleanPreview7 = DOMPurify.sanitize(newsletterContent?.[7]?.value);
  const cleanPreview9 = DOMPurify.sanitize(newsletterContent?.[9]?.value);
  const cleanPreview10 = DOMPurify.sanitize(newsletterContent?.[10]?.value);
  const cleanPreview11 = DOMPurify.sanitize(newsletterContent?.[11]?.value);

  return (
    <Container>
      <Row className="mx-auto w-100 ">
        <Card className="template-container">
          <Card.Body>
            <div>
              <div className="template-header">
                <h1 dangerouslySetInnerHTML={{ __html: cleanPreview }}></h1>
                <h2 dangerouslySetInnerHTML={{ __html: cleanPreview9 }}></h2>
                <p dangerouslySetInnerHTML={{ __html: cleanPreview10 }}></p>
              </div>
              <div className="template-body">
                <div className="template-body-header mx-2">
                  <h3 dangerouslySetInnerHTML={{ __html: cleanPreview1 }}></h3>
                </div>
                <div className="template-body-text mx-2">
                  <p dangerouslySetInnerHTML={{ __html: cleanPreview11 }}></p>
                  <img
                    className="content-template-images"
                    src={
                      newsletterContent?.[8]?.value ||
                      'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg'
                    }
                    alt=""
                  />
                </div>
                <div className="template-topics">
                  <div className="template-card-before"></div>
                  <div className="template-topic">
                    <h3 dangerouslySetInnerHTML={{ __html: cleanPreview2 }}></h3>
                    <p dangerouslySetInnerHTML={{ __html: cleanPreview3 }}></p>
                  </div>
                  <div className="template-topic">
                    <h3 dangerouslySetInnerHTML={{ __html: cleanPreview4 }}></h3>
                    <p dangerouslySetInnerHTML={{ __html: cleanPreview5 }}></p>
                  </div>
                  <div className="template-topic">
                    <h3 dangerouslySetInnerHTML={{ __html: cleanPreview6 }}></h3>
                    <p dangerouslySetInnerHTML={{ __html: cleanPreview7 }}></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="template-card-after mb-3"></div>
          </Card.Body>
        </Card>
        <div>
          <Link className="link-btn btn btn-secondary mt-2 float-start mb-2" type="button" to="/newsletters">
            Back
          </Link>
        </div>
      </Row>
    </Container>
  );
}

export default NewsletterPreview;
