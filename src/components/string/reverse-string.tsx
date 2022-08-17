import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { ICharacter } from '../../types/types';
import { delay } from '../utils/utils';

export const reverseString = async (arr: ICharacter[], setStringArr: Dispatch<SetStateAction<ICharacter[]>>) => {
  const mid = arr.length / 2;
  let count = 0;

  while (count < mid) {
    if (arr[count].hasOwnProperty('state')) {
      let start = arr[count];
      let end = arr[arr.length - count - 1];

      start.state = ElementStates.Changing;
      end.state = ElementStates.Changing;
      setStringArr([...arr]);
      await delay(DELAY_IN_MS);

      start.state = ElementStates.Modified;
      end.state = ElementStates.Modified;
    }
    
    [arr[count], arr[arr.length - count - 1]] = [arr[arr.length - count - 1], arr[count]];
    if (arr[count].hasOwnProperty('state')) {
      setStringArr([...arr]);
      await delay(DELAY_IN_MS);
    }
    

    count++;
  };
  return arr
};