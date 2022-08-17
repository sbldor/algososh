import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { IArr } from '../../types/types';
import { delay } from '../utils/utils';

export const bubbleSort = async (
  order: string,
  arr: IArr[],
  setArr: Dispatch<SetStateAction<IArr[]>>,
  setIsLoading: Dispatch<SetStateAction<string>>
  ) => {

  let modifiedArray = false
  if (arr.length !== 0 && arr[0].hasOwnProperty('state')) modifiedArray = true

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      if (modifiedArray) {

        arr[j].state = ElementStates.Changing;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;

        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if ((order === 'asc' ? arr[j].num : arr[j + 1].num) > (order === 'asc' ? arr[j + 1].num : arr[j].num)) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        };

        arr[j].state = ElementStates.Default;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
        setArr([...arr]);

      }

      if ((order === 'asc' ? arr[j] : arr[j + 1]) > (order === 'asc' ? arr[j + 1] : arr[j])) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      };
    };
    if (modifiedArray) {
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArr([...arr]);
    }
  };
  if (modifiedArray) setIsLoading('none');
  return arr
};