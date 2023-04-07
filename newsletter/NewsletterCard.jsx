import React from 'react';
import { useNavigate } from 'react-router';
import debug from 'sabio-debug';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './newsletter.css';
import { formatDate } from '../../utils/dateFormater.js';

const _logger = debug.extend('NewsletterCard');

function NewsletterCard(props) {
  const aNewsletter = props.newsletters;
  const { currentUser } = props;
  _logger(currentUser, 'hey im the user');

  const { lgCol, mdCol, smCol } = props;
  const navigate = useNavigate();

  const aNewsletters = props.newsletters;
  _logger('NewsletterCard', aNewsletters);

  const onClickEdit = () => {
    _logger(aNewsletter);
    let stateToTransport = { type: 'NEWSLETTER_STATE', values: aNewsletter };
    navigate(`/newsletters/new/${aNewsletter.id}`, { state: stateToTransport, aNewsletter });
  };

  const onDeleteClicked = (e) => {
    e.preventDefault();
    props.onNewsletterClicked(props.newsletters, e);
  };

  const dates = formatDate(aNewsletter.dateToPublish);
  _logger(aNewsletters.dateToPublish);

  const navigateToContent = () => {
    _logger('is firing');
    const stateForTransport = {
      type: 'ADD_NEWSLETTER_CONTENT',
      newsletterData: aNewsletter,
    };
    navigate(`/newsletters/content/${aNewsletter.id}`, { state: stateForTransport });
  };

  const navToNewsletterContent = (e) => {
    e.preventDefault();
    const stateForTransport = {
      type: 'ADD_NEWSLETTER_CONTENT',
      newsletterData: aNewsletter.id,
    };
    navigate(`/newsletterpreview/${aNewsletter.id}`, { state: stateForTransport });
  };

  return (
    <Col lg={lgCol} md={mdCol} sm={smCol} className="mb-2 mt-2">
      <div className="d-block card news-newsletter-card pe-1 d-table">
        <h3 className="card-title pt-2 ms-2">{aNewsletters.newsletterCategory.name}</h3>
        <img
          src={aNewsletters.coverPhoto}
          className="news-newsletter-images newsletter-image ms-1 shadow-lg rounded"
          alt="..."
          onClick={navToNewsletterContent}
        />
        <div className="card-body">
          <h4 className="card-text d-flex justify-content-center">{aNewsletters.name}</h4>
          <h5 className="card-text d-flex justify-content-center">{aNewsletters.description}</h5>
          <h5 className="card-text d-flex justify-content-center">{dates.slice(0, 10)}</h5>

          {currentUser?.isLoggedIn ? (
            <div className="float-end">
              <i onClick={onDeleteClicked} className="dripicons-trash news-newsletter-trash m-1"></i>
              <i onClick={onClickEdit} className="dripicons-document-edit"></i>
            </div>
          ) : (
            <span />
          )}
          {currentUser?.isLoggedIn ? (
            <a className="ds-card-link newsletter-link" id="content" name="content" onClick={navigateToContent}>
              Create Content
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </Col>
  );
}

NewsletterCard.propTypes = {
  newsletters: PropTypes.shape({
    id: PropTypes.number.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateToPublish: PropTypes.string.isRequired,
    newsletterCategory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  onNewsletterClicked: PropTypes.func.isRequired,
  lgCol: PropTypes.number.isRequired,
  mdCol: PropTypes.number.isRequired,
  smCol: PropTypes.number.isRequired,

  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    mi: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewsletterCard;
