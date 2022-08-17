import React, {FC, SyntheticEvent, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Stack } from './stack';
import { ElementStates } from '../../types/element-states';

interface IStackItem {
  text: string | null,
  state: ElementStates;
};

export const StackPage: FC = () => {

  const newStack = new Stack<string>();

  const [input, setInput] = useState<string>('');
  const [isLoading, setisLoading] = useState<string>('none');
  const [stackArr, setStackArr] = useState<IStackItem[]>([]);
  // сохранение значения инпута
  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.currentTarget.value);
  };

  const pushStack = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading('add');

    newStack.push(input);
    stackArr.push({
      text: newStack.peak(),
      state: ElementStates.Changing,
    });
    setInput('');
    setStackArr([...stackArr]);

    await delay(SHORT_DELAY_IN_MS);

    stackArr[stackArr.length - 1].state = ElementStates.Default;
    setStackArr([...stackArr]);
    setisLoading('none');
  };

  const popStack = async () => {
    setisLoading('del');

    stackArr[stackArr.length - 1].state = ElementStates.Changing;
    setStackArr([...stackArr]);

    await delay(SHORT_DELAY_IN_MS);

    newStack.pop();
    stackArr.pop();
    setStackArr([...stackArr]);
    setisLoading('none');
  }

  const clearStack = async () => {
    setisLoading('cl');

    stackArr.forEach(item => {
      item.state = ElementStates.Changing;
    });

    await delay(SHORT_DELAY_IN_MS);

    newStack.clearAll();
    setStackArr([]);
    setisLoading('none');
  };

  // отключение кнопок
  const isDisabled = (order: string) => {
    return isLoading !== order && isLoading !== 'none'
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={pushStack}>
        <div className={style.inputCont}>
          <Input
            value={input}
            onChange={e => changeInput(e)}
            isLimitText={true}
            maxLength={4}
            disabled={isLoading !== 'none'}
            extraClass={style.input} />
          <Button
            disabled={input === '' || isDisabled('add')}
            text='Добавить'
            type='submit'
            isLoader={isLoading === 'add'} />
          <Button
            disabled={!stackArr.length || isDisabled('dell')}
            text='Удалить'
            type='button'
            isLoader={isLoading === 'del'}
            extraClass={style.buttonMargin}
            onClick={popStack} />
          <Button
            disabled={!stackArr.length || isDisabled('cl')}
            text='Очистить'
            type='reset'
            isLoader={isLoading === 'cl'}
            onClick={clearStack} />
        </div>
      </form>

      <ul className={style.circleCont}>
        {stackArr && stackArr.map((item, index) =>
          <li key={index}>
            <Circle 
              letter={item.text || ''} 
              index={index} state={item.state}
              head={stackArr.length - 1 === index ? 'top' : ''} />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
