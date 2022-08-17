import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { IArr } from '../../types/types';
import { delay } from '../utils/utils';

export const selectionSort = async ( 
  order: string, 
  arr: IArr[], 
  setArr: Dispatch<SetStateAction<IArr[]>>, 
  setIsLoading: Dispatch<SetStateAction<string>>
  ) => {

  let modifiedArray = false
  if (arr.length !== 0 && arr[0].hasOwnProperty('state')) modifiedArray = true
  for (let i = 0; i < arr.length; i++) {

    let maxInd = i;
    if (modifiedArray) arr[maxInd].state = ElementStates.Changing;

    for (let j = i + 1; j < arr.length; j++) {
      if(modifiedArray) {

        arr[j].state = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if ((order === 'asc' ? arr[maxInd].num : arr[j].num) > (order === 'asc' ? arr[j].num : arr[maxInd].num)) {
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          arr[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxInd) arr[j].state = ElementStates.Default;
        setArr([...arr]);
      };
      if ((order === 'asc' ? arr[maxInd] : arr[j]) > (order === 'asc' ? arr[j] : arr[maxInd])) maxInd = j
    }

    const temp = arr[i];
    arr[i] = arr[maxInd];
    arr[maxInd] = temp;

    if (modifiedArray) {
      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;

      setArr([...arr]);
    }
  };
  if (modifiedArray) setIsLoading('none');
  return arr
};