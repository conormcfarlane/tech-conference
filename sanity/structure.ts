import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conference Content')
    .items([
      S.documentTypeListItem('talk').title('Talks'),
      S.documentTypeListItem('speaker').title('Speakers'),
      S.documentTypeListItem('track').title('Tracks'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['talk', 'speaker', 'track'].includes(item.getId()!),
      ),
    ])
