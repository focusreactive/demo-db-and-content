import { dynamicPage } from './dynamicPage';
import common from './common';
import contentBlocks from './contentBlocks';
import casinos from './DB/casino';

export const schemaTypes = [dynamicPage, ...common, ...contentBlocks, ...casinos];
