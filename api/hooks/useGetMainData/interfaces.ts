import { UseRequestResultQuery } from '@api';
import { Dictionaries, Maybe, User } from '@interfaces';

export interface UseGetMainDataResult extends UseRequestResultQuery {
  data: {
    user: Maybe<User>;
    dictionaries: Maybe<Dictionaries>;
  };
}
