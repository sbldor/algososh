import React, {FC, useState, useEffect } from "react";
import style from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

interface IArr {
  num: number
  state: ElementStates
};

export const SortingPage: FC = () => {

  const [method, setMethod] = useState<string>('selection');
  const [isLoading, setIsLoading] = useState<string>('none');
  const [randomArr, setArr] = useState<IArr[]>([]);
  // розмеры массива
  const minLen = 3;
  const maxLen = 17;
  // рандомное число
  const randomNum = (): number => Math.floor(Math.random() * 100) + 1;
  // рандомный массив
  const createRandomArr = () => {
    setIsLoading('arr')
    const randomLen = Math.random() * (maxLen - minLen) + minLen;
    const randomArr: IArr[] = Array.from({ length: randomLen }, () => ({
      num: randomNum(),
      state: ElementStates.Default,
    }));
    setArr(randomArr);
    setIsLoading('none')
  };
  // сортировка выбором
  const selectionSort = async (order: string, arr: IArr[]) => {

    for (let i = 0; i < arr.length; i++) {

      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;

      for (let j = i + 1; j < arr.length; j++) {

        arr[j].state = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if (order === 'desc' ? arr[j].num > arr[maxInd].num : arr[j].num < arr[maxInd].num) {
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          arr[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxInd) arr[j].state = ElementStates.Default;
        setArr([...arr]);
      };
      
      const temp = arr[i];
      arr[i] = arr[maxInd];
      arr[maxInd] = temp;

      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;

      setArr([...arr]);
    };
    setIsLoading('none');
  };
  // сортировка пузырьком
  const bubbleSort = async (order: string, arr: IArr[]) => {
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {

        arr[j].state = ElementStates.Changing;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;

        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if (order === 'asc' ? arr[j].num > arr[j+1].num : arr[j].num < arr[j+1].num) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        };

        arr[j].state = ElementStates.Default;
        if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
        setArr([...arr]);
      };

      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArr([...arr]);
    };
    setIsLoading('none');
  };
  // функция выбора нужного метода сортировки и отключения кнопок
  const onSortClick = (order: string, method: string) => {
      setIsLoading(order);
      method === 'bubble' ? bubbleSort(order, randomArr) : selectionSort(order, randomArr);
  };

  useEffect(() => { createRandomArr() }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form>
        <div className={style.cont}>
          <RadioInput
            onChange={() => setMethod('selection')}
            checked={method === 'selection'}
            name='sortMethod'
            label='Выбор'
            disabled={isLoading !== 'none'}
            extraClass={'mr-12'}
          />
          <RadioInput
            onChange={() => setMethod('bubble')}
            checked={method === 'bubble'}
            name='sortMethod'
            label='Пузырёк'
            disabled={isLoading !== 'none'}
            extraClass={style.radioMargin}
          />
          <Button
            text='По возрастанию'
            type='button'
            sorting={Direction.Ascending}
            isLoader={isLoading === 'asc'}
            disabled={isLoading === 'desc'}
            extraClass={style.button}
            onClick={() => onSortClick('asc', method)} />
          <Button
            text='По убыванию'
            type='button'
            sorting={Direction.Descending}
            isLoader={isLoading === 'desc'}
            disabled={isLoading === 'asc'}
            extraClass={`mr-40 ${style.button}`}
            onClick={() => onSortClick('desc', method)} />
          <Button
            text='Новый массив'
            type='button'
            isLoader={isLoading === 'arr'}
            disabled={isLoading !== 'none' && isLoading !== 'arr'}
            extraClass={style.button}
            onClick={createRandomArr} />
        </div>
      </form>

      <ul className={style.columnCont}>
        {randomArr && randomArr.map((item, index) =>
          <li key={index}>
            <Column 
              index={item.num} 
              state={item.state} />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
