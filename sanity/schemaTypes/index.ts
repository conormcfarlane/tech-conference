import { type SchemaTypeDefinition } from 'sanity'

import { speakerType } from './speakerType'
import { talkType } from './talkType'
import { trackType } from './trackType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [speakerType, trackType, talkType],
}
