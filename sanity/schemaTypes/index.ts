import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType } from './productType'
import { OrderType } from './orderType'
import { salesType } from './salesType'
import { homepageType } from './homepageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, OrderType, productType, salesType, homepageType],
}
