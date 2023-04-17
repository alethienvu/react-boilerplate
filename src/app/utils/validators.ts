import { LanguageTranslate } from 'app/languages';
import * as yup from 'yup';

export const sampleValidator = yup.object().shape({});

export const loginValidator = yup.object({
  email: yup.string().required(LanguageTranslate.validate.require_exists),
  password: yup.string().required(LanguageTranslate.validate.require_exists),
});
