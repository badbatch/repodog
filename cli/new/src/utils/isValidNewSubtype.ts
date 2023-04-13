import { NewRepoSubtype, NewType } from '../types.ts';

export const VALID_NEW_SUBTYPES = {
  [NewType.REPO]: Object.values(NewRepoSubtype) as string[],
};

export const isValidNewSubtype = (type: NewType, subtype = '') => {
  switch (type) {
    case NewType.REPO: {
      return VALID_NEW_SUBTYPES[NewType.REPO].includes(subtype);
    }

    default: {
      return false;
    }
  }
};
