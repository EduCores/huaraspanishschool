import { bilingualTypes } from './bilingual';
import faq from './faq';
import lookbook from './lookbook';
import program from './program';
import review from './review';
import siteSettings from './siteSettings';
import story from './story';

export const schemaTypes = [
  ...bilingualTypes,
  program,
  review,
  faq,
  story,
  lookbook,
  siteSettings,
];
