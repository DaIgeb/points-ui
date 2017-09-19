export const getCaption =
  (person: TPerson | undefined) =>
    person ? `${person.lastName} ${person.firstName}` : 'Not loaded';