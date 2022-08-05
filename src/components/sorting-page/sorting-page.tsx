import React, {FC, useState, useEffect } from "react";
import style from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { selectionSort } from './selection-sort';
import { bubbleSort } from './bubbel-sort'

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
  
  // функция выбора нужного метода сортировки и отключения кнопок
  const onSortClick = (order: string, method: string) => {
      setIsLoading(order);
      method === 'bubble' ? bubbleSort(order, randomArr, setArr, setIsLoading) : selectionSort(order, randomArr, setArr, setIsLoading);
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
