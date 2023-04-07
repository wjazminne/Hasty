import React from 'react';
import './newsletter.css';
import { Container, Row, Card } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import DOMPurify from 'dompurify';

function TemplatePreview() {
  const { values } = useFormikContext();

  const cleanPreview = DOMPurify.sanitize(values?.content?.[0]?.contentValue);
  const cleanPreview1 = DOMPurify.sanitize(values?.content?.[1]?.contentValue);
  const cleanPreview2 = DOMPurify.sanitize(values?.content?.[2]?.contentValue);
  const cleanPreview3 = DOMPurify.sanitize(values?.content?.[3]?.contentValue);
  const cleanPreview4 = DOMPurify.sanitize(values?.content?.[4]?.contentValue);
  const cleanPreview5 = DOMPurify.sanitize(values?.content?.[5]?.contentValue);
  const cleanPreview6 = DOMPurify.sanitize(values?.content?.[6]?.contentValue);
  const cleanPreview7 = DOMPurify.sanitize(values?.content?.[7]?.contentValue);
  const cleanPreview9 = DOMPurify.sanitize(values?.content?.[9]?.contentValue);
  const cleanPreview10 = DOMPurify.sanitize(values?.content?.[10]?.contentValue);
  const cleanPreview11 = DOMPurify.sanitize(values?.content?.[11]?.contentValue);

  return (
    <Container>
      <Row className="mx-auto w-100 ">
        <Card className="template-container">
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
                    values?.content[8]?.contentValue ||
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
        </Card>
      </Row>
    </Container>
  );
}

export default TemplatePreview;
