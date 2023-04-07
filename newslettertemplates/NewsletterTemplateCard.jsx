import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import { Col } from 'react-bootstrap';
import './newslettertemplate.css';
import { useNavigate } from 'react-router-dom';

const _logger = debug.extend('NewsletterTemplateCard');

function NewsletterTemplateCard(props) {
  const aTemplate = props.newsletterTemplate;
  const { lgCol, mdCol, smCol } = props;
  const navigate = useNavigate();

  const aNewsletterTemplate = props.newsletterTemplate;
  _logger('NewsletterTemplateCard', aNewsletterTemplate);

  const onClickFormEdit = () => {
    let stateToTransport = { type: 'NEWSLETTER_TEMPLATE_STATE', values: aTemplate };
    navigate(`/templates/new/${aTemplate.id}`, { state: stateToTransport, aTemplate });
  };

  const onDeleteTemplateClicked = (e) => {
    e.preventDefault();
    props.onTemplateClicked(props.newsletterTemplate, e);
  };

  return (
    <Col lg={lgCol} md={mdCol} sm={smCol} className="mb-2 mt-2">
      <div className="d-block card news-template-card">
        <img
          src={aNewsletterTemplate.primaryImage}
          className="card-img news-template-images ms-1 shadow-lg rounded mt-2"
          alt="Newsletter Template"
        />
        <h4 className="card-title pt-2 d-flex justify-content-center">{aNewsletterTemplate.name}</h4>
        <i onClick={onDeleteTemplateClicked} className="dripicons-trash news-template-trash ms-2"></i>{' '}
        <i onClick={onClickFormEdit} className="dripicons-document-edit"></i>
      </div>
    </Col>
  );
}

NewsletterTemplateCard.propTypes = {
  newsletterTemplate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    primaryImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onTemplateClicked: PropTypes.func.isRequired,
  lgCol: PropTypes.number.isRequired,
  mdCol: PropTypes.number.isRequired,
  smCol: PropTypes.number.isRequired,
};

export default NewsletterTemplateCard;
