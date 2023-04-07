import * as Yup from 'yup';

const newsletterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').min(2).max(50).required('Required'),
});

const querySchema = Yup.object().shape({
  query: Yup.string().min(2).max(50),
});
const templateSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  description: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  primaryImage: Yup.string().required('Required'),
});

const newslettersSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  description: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!').required('Required'),
  coverPhoto: Yup.string().required('Required'),
  dateToPublish: Yup.date().required('Required'),
  dateToExpire: Yup.date().required('Required'),
  isSubscribed: Yup.bool(),
});

const contentSchema = Yup.object().shape({
  content: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required('Required'),
      contentValue: Yup.string().min(2, 'Too Short!').max(4000, 'To Long!').required('Required'),
    })
  ),
});
export { newsletterSchema, querySchema, templateSchema, newslettersSchema, contentSchema };
