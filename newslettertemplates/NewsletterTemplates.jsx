import React, { useState, useEffect, useCallback } from 'react';
import debug from 'sabio-debug';
import { getAllPaginate, deleteTemplate } from '../../services/newsletterTemplatesService';
import NewsletterTemplateCard from './NewsletterTemplateCard';
import locale from 'rc-pagination';
import Pagination from 'rc-pagination';
import toastr from 'toastr';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../elements/Header';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const _logger = debug.extend('NewsletterTemplates');

function NewsletterTemplates() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    newsletterTemplates: [],
    newsletterTemplatesComponents: [],
    pageIndex: 0,
    pageSize: 12,
    totalCount: 0,
  });

  useEffect(() => {
    getAllPaginate(pageData.pageIndex, pageData.pageSize).then(onGetAllSuccess).catch(onGetAllError);
  }, [pageData.pageIndex]);

  const onGetAllSuccess = (data) => {
    const templateData = data.item.pagedItems;
    _logger(templateData);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.newsletterTemplates = templateData;
      pd.newsletterTemplatesComponents = templateData.map(mapNewsletterTemplates);
      pd.totalCount = data.item.totalCount;
      return pd;
    });
  };

  const onGetAllError = (error) => {
    toastr.error(error.message, 'Newsletter Template not found');
  };

  const onDeleteTemplate = useCallback((myTemplate, eobj) => {
    _logger(myTemplate, eobj);
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
        const handler = onDeleteSuccess(myTemplate.id);
        deleteTemplate(myTemplate.id).then(handler).catch(onDeleteError);
      }
    });
  }, []);

  const onDeleteSuccess = (idToBeDeleted) => {
    _logger('Deleted', idToBeDeleted);
    toastr.success('Newsletter Template Deleted');
    return () => {
      _logger('Delete Success', idToBeDeleted);

      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.newsletterTemplates = prevState.newsletterTemplates.filter((template) => {
          let result = false;
          if (template.id !== idToBeDeleted) {
            result = true;
          }
          return result;
        });
        pd.newsletterTemplatesComponents = pd.newsletterTemplates.map(mapNewsletterTemplates);
        return pd;
      });
    };
  };

  const onDeleteError = (err) => {
    toastr.error('Newsletter Template Not Deleted');
    _logger('Deleting', err);
  };

  const mapNewsletterTemplates = (aNewsletterTemplate) => {
    _logger(aNewsletterTemplate);
    return (
      <NewsletterTemplateCard
        key={aNewsletterTemplate.id}
        newsletterTemplate={aNewsletterTemplate}
        onTemplateClicked={onDeleteTemplate}
        lgCol={3}
        mdCol={4}
        smCol={12}
      />
    );
  };

  const crumbs = [
    {
      name: 'Newsletter Templates',
      path: '/newslettertemplates',
    },
  ];

  const onChange = (page) => {
    setPageData((prevState) => {
      let newIndex = { ...prevState };
      newIndex.pageIndex = page - 1;
      return newIndex;
    });
  };

  const navigateToPage = (e) => {
    e.preventDefault();
    const stateForTransport = {
      type: 'ADMIN_VIEW',
    };
    navigate('/templates/new', { state: stateForTransport });
  };

  const navToNewsletters = () => {
    navigate('/newsletters');
  };

  return (
    <Container id="newsletterTemplateContainer">
      <Row>
        <Col>
          <Header title="Newsletter Templates" crumbs={crumbs} />
        </Col>
      </Row>

      <Button type="button" onClick={navigateToPage} className="float-end btn-secondary mb-2 m-1">
        Create New Template
      </Button>
      <Button type="button" onClick={navToNewsletters} className="float-end btn-secondary mb-2 m-1">
        {'View Newsletters'}
      </Button>
      <Pagination
        onChange={onChange}
        current={pageData.pageIndex + 1}
        total={pageData.totalCount}
        pageSize={pageData.pageSize}
        locale={locale}
        className="mt-3 mx-2 "
      />
      <div className="col-12">
        <Row className="shadow-lg bg-body rounded mt-1 mx-auto p-2">{pageData.newsletterTemplatesComponents}</Row>
      </div>
      <Pagination
        onChange={onChange}
        current={pageData.pageIndex + 1}
        total={pageData.totalCount}
        pageSize={pageData.pageSize}
        locale={locale}
        className="mb-2 mt-2 mx-2"
      />
    </Container>
  );
}

export default NewsletterTemplates;
