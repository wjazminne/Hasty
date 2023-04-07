import React, { useState, useEffect, useCallback } from 'react';
import debug from 'sabio-debug';
import {
  deleteNewsletter,
  getAllPaginate,
  getNewsletterByCategory,
  getNonSubscribed,
} from '../../services/newslettersService';
import toastr from 'toastr';
import { Container, Row, Col, Button } from 'react-bootstrap';
import locale from 'rc-pagination';
import Pagination from 'rc-pagination';
import Header from '../elements/Header';
import NewsletterCard from './NewsletterCard';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import lookUpService from '../../services/lookUpService';
import PropTypes from 'prop-types';

const _logger = debug.extend('Newsletters');

function Newsletters(props) {
  const navigate = useNavigate();

  const { currentUser } = props;
  _logger(currentUser, 'hey im the user');

  const [pageData, setPageData] = useState({
    newsletters: [],
    newsletterComponents: [],
    pageIndex: 0,
    pageSize: 12,
    totalCount: 0,
    arrayOfCategoryTypes: [],
    categoryTypes: { id: 0, value: '' },
    categoryOptions: [],
    selectValue: 0,
    filter: '',
  });

  const [isSubscribed, setSubscribed] = useState(true);

  useEffect(() => {
    lookUpService.LookUp(['NewsletterCategories']).then(onGetCategorySuccess).catch(onGetCategoryError);

    if (!isSubscribed) {
      _logger('not subscribed');
      getNotSubscribed();
    } else if (!pageData.selectValue) {
      _logger('get all');
      getAllPaged();
    } else if (pageData.selectValue) {
      _logger('get by value');
      _logger(pageData.selectValue);
      getFiltered();
    } else if (!currentUser.firstName) {
      getAllPaged();
    }
  }, [pageData.pageIndex, pageData.selectValue, isSubscribed, currentUser]);

  const onGetCategorySuccess = (response) => {
    const arrayOfCategories = response.item.newsletterCategories;
    _logger(arrayOfCategories);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfCategoryTypes = arrayOfCategories;
      pd.categoryOptions = arrayOfCategories.map(mapCategoryType);
      return pd;
    });
  };
  const onGetCategoryError = () => {
    _logger('failed');
  };

  const getAllPaged = () => {
    getAllPaginate(pageData.pageIndex, pageData.pageSize).then(onGetAllSuccess).catch(onGetAllError);
  };

  const getFiltered = () => {
    getNewsletterByCategory(pageData.selectValue, pageData.pageIndex, pageData.pageSize)
      .then(onGetAllSuccess)
      .catch(onGetCategoryFilterError);
  };

  const getNotSubscribed = () => {
    getNonSubscribed(pageData.pageIndex, pageData.pageSize).then(onGetAllSuccess).catch(onGetNonSubError);
  };

  const onGetAllSuccess = (data) => {
    _logger('inside in the get all success', data);
    const newsletterData = data.item.pagedItems;
    _logger('data from request', data);
    _logger('inside in the get all success');
    _logger(newsletterData);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.newsletters = newsletterData;
      pd.newsletterComponents = newsletterData.map(mapNewsletters);
      pd.totalCount = data.item.totalCount;
      _logger(pd);
      return pd;
    });
  };

  const onGetAllError = (error) => {
    toastr.error(error.message, 'Newsletter not found');
    _logger(error, 'error');
  };

  const onGetCategoryFilterError = (error) => {
    toastr.error(error.message, 'Not found');
    _logger('failed');
  };

  const onGetNonSubError = (error) => {
    toastr.error(error.message, 'Not found');
    _logger('failed');
  };

  const onTypeChange = (e) => {
    const target = e.target;
    const fieldValue = target.value;
    _logger(e.target.value);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.selectValue = parseInt(fieldValue, 10) || 0;
      return pd;
    });
  };

  const onDeleteNewsletter = useCallback((myNewsletter, eobj) => {
    _logger(myNewsletter, eobj);
    Swal.fire({
      showCancelButton: true,
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      iconColor: 'red',
      cancelButtonColor: 'red',
      confirmButtonColor: 'blue',
    }).then((result) => {
      if (result.isConfirmed) {
        const handler = onDeleteSuccess(myNewsletter.id);
        deleteNewsletter(myNewsletter.id).then(handler).catch(onDeleteError);
      }
    });
  }, []);

  const onDeleteSuccess = (idToBeDeleted) => {
    _logger('Deleted', idToBeDeleted);
    toastr.success('Newsletter Deleted');
    return () => {
      _logger('Delete Success', idToBeDeleted);

      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.newsletters = prevState.newsletters.filter((newsletter) => {
          let result = false;
          if (newsletter.id !== idToBeDeleted) {
            result = true;
          }
          return result;
        });
        pd.newsletterComponents = pd.newsletters.map(mapNewsletters);
        return pd;
      });
    };
  };

  const onDeleteError = (err) => {
    _logger('Deleting', err);
  };

  const mapNewsletters = (aNewsletter) => {
    _logger(aNewsletter);
    return (
      <NewsletterCard
        key={aNewsletter.id}
        newsletters={aNewsletter}
        currentUser={currentUser}
        onNewsletterClicked={onDeleteNewsletter}
        lgCol={3}
        mdCol={4}
        smCol={12}
      />
    );
  };

  const mapCategoryType = (categoryType) => {
    return (
      <option key={'CategoryTypeOp_' + categoryType.id} value={categoryType.id}>
        {categoryType.name}
      </option>
    );
  };

  const crumbs = [
    {
      name: 'Newsletters',
      path: '/newsletters',
    },
  ];

  const onPageChange = (page) => {
    setPageData((prevState) => {
      let newIndex = { ...prevState };
      newIndex.pageIndex = page - 1;
      return newIndex;
    });
  };

  const navigateToNewsletter = (e) => {
    e.preventDefault();
    const stateForTransport = {
      type: 'USER_VIEW',
    };
    navigate('/newsletters/new', { state: stateForTransport });
  };

  const onResetClicked = () => {
    _logger(onResetClicked, 'is firing');
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.selectValue = 0;
      return pd;
    });
  };

  const onNotSubscribedClicked = () => {
    _logger('show not subscribed');
    setSubscribed(!isSubscribed);
  };

  const navToTemplate = () => {
    navigate('/newslettertemplates');
  };

  return (
    <Container id="newsletterTemplateContainer">
      <Row>
        <Col>
          <Header title="Newsletters" crumbs={crumbs} />
        </Col>
      </Row>

      <Pagination
        onChange={onPageChange}
        current={pageData.pageIndex + 1}
        total={pageData.totalCount}
        pageSize={pageData.pageSize}
        locale={locale}
        className="mb-2 mx-2"
      />
      <Row className="d-block pe-1">
        {currentUser.isLoggedIn ? (
          <Button type="button" onClick={navigateToNewsletter} className="btn-secondary mb-2 m-1 col-auto ms-2">
            Add Newsletter
          </Button>
        ) : (
          <span />
        )}
        {currentUser.isLoggedIn ? (
          <Button type="button" onClick={navToTemplate} className="btn-secondary mb-2 m-1 col-auto">
            {'View Templates'}
          </Button>
        ) : (
          <span />
        )}

        {currentUser.isLoggedIn ? (
          <Button
            type="submit"
            onClick={onNotSubscribedClicked}
            className="btn-secondary mb-2 m-1 float-end col-auto"
            id="im NEW"
            name="nonSubscribers">
            {isSubscribed ? 'Not Subscribed' : 'Show All'}
          </Button>
        ) : (
          <span />
        )}

        <Button type="button" onClick={onResetClicked} className="btn-secondary mb-2 m-1 float-end col-auto">
          Reset
        </Button>
        <div className="col-md-2 mt-1 float-end">
          <div className="form-group">
            <select
              id="filter"
              name="filter"
              className="form-control"
              value={pageData.selectValue}
              onChange={onTypeChange}>
              <option value="0">Search a Category</option>
              {pageData?.categoryOptions}
            </select>
          </div>
        </div>
      </Row>
      <Row className="d-inline-block">
        <div className="col-12">
          <Row className="shadow-lg bg-body rounded mt-1 mx-auto p-2">
            {currentUser?.isLoggedIn && pageData?.newsletterComponents?.length > 0 && pageData.newsletterComponents}
            {!currentUser?.isLoggedIn && pageData?.newsletterComponents?.length > 0 && pageData.newsletterComponents}
          </Row>
        </div>
      </Row>
      <Pagination
        onChange={onPageChange}
        current={pageData.pageIndex + 1}
        total={pageData.totalCount}
        pageSize={pageData.pageSize}
        locale={locale}
        className="mb-2 mt-2 mx-2"
      />
    </Container>
  );
}

Newsletters.propTypes = {
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

export default Newsletters;
