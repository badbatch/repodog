import { NewRepoSubtype, NewType } from '../types.ts';

export const VALID_NEW_SUBTYPES = {
  [NewType.REPO]: Object.values(NewRepoSubtype) as string[],
  [NewType.PKG]: [] as string[],
};

export const isValidNewSubtype = (type: NewType, subtype = '') => {
  switch (type) {
    case NewType.REPO: {
      return VALID_NEW_SUBTYPES[NewType.REPO].includes(subtype);
    }

    case NewType.PKG: {
      return VALID_NEW_SUBTYPES[NewType.PKG].includes(subtype);
    }
  }
};
