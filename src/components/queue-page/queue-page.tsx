import React, { FC, useState, useEffect, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { Queue } from "./queue";

interface IQueueItem {
  text: string
  state: ElementStates
  tail: boolean
  head: boolean
}
// новая очередь
const queueSize: number = 7;
const newQueue = new Queue<string>(queueSize);

export const QueuePage: FC = () => {

  const defaultArr: IQueueItem[] = [...Array(queueSize)].map(_ => ({
    text: '',
    state: ElementStates.Default,
    tail: false,
    head: false
  }));

  const [input, setInput] = useState<string>('');
  const [isQueueActive, setQueueActive] = useState<boolean>(false);
  const [queueArr, setQueuequeueArr] = useState<IQueueItem[]>(defaultArr);
  const [isLoading, setIsLoading] = useState<string>('none');
  // значение инпута
  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.currentTarget.value);
  };
  // добавление в очередь
  const addQueueItem = async () => {

    setIsLoading('add');
    newQueue.enqueue(input);
    queueArr[newQueue.getHead()].head = true;

    if (newQueue.getTail() > 0) queueArr[newQueue.getTail() - 1].tail = false;

    queueArr[newQueue.getTail()].text = input;
    queueArr[newQueue.getTail()].tail = true;
    queueArr[newQueue.getTail()].state = ElementStates.Changing;

    await delay(SHORT_DELAY_IN_MS);

    queueArr[newQueue.getTail()].state = ElementStates.Default;

    setInput('');
    setIsLoading('none');
  };
  // удаление из очереди
  const deleteQueueItem = async () => {

    if (newQueue.getHead() === newQueue.getTail()) {
      setIsLoading('dell');
      clearQueue();
    } else {
      setIsLoading('dell');

      newQueue.dequeue();
      queueArr[newQueue.getHead() - 1].state = ElementStates.Changing;

      await delay(SHORT_DELAY_IN_MS);

      queueArr[newQueue.getHead() - 1].state = ElementStates.Default;
      if (newQueue.getHead() > 0) {
        queueArr[newQueue.getHead() - 1].head = false;
        queueArr[newQueue.getHead() - 1].text = '';
      }
      queueArr[newQueue.getHead()].head = true;
      setIsLoading('none');
    };
  };
  // очиска со стейтом
  const clearStates = () => {
    setIsLoading('cl')
    clearQueue()
  }


  useEffect(() => {
    setQueueActive(!newQueue.isEmpty());
  }, [isLoading]);
  // очистка
  const clearQueue = async () => {

    await delay(SHORT_DELAY_IN_MS);

    newQueue.clear();
    setQueuequeueArr(defaultArr);
    setIsLoading('none');
  };
  // блокировка кнопок
  const isDisabled = (order: string) => {
    return isLoading !== order && isLoading !== 'none';
  }

  return (
    <SolutionLayout title="Очередь">
      <form>
        <div className={style.cont}>
          <Input
            value={input}
            onChange={e => changeInput(e)}
            isLimitText={true}
            maxLength={4}
            disabled={isLoading !== 'none'}
            extraClass={style.input} />
          <Button
            disabled={input === '' || newQueue.getLength() >= 7 || newQueue.isFull() || isDisabled('add')}
            text='Добавить'
            type='button'
            isLoader={isLoading === 'add'}
            onClick={addQueueItem} />
          <Button
            disabled={!isQueueActive || isDisabled('dell')}
            text='Удалить'
            type='button'
            isLoader={isLoading === 'dell'}
            extraClass={style.buttonMargin}
            onClick={deleteQueueItem} />
          <Button
            disabled={!isQueueActive || isDisabled('cl')}
            text='Очистить'
            type='reset'
            isLoader={isLoading === 'cl'}
            onClick={clearStates} />
        </div>
      </form>

      <ul className={style.circleCont}>
        {queueArr && queueArr.map((item, index) =>
          <li key={index}>
            <Circle 
              letter={item.text} 
              index={index} 
              state={item.state}
              head={item.head ? 'head' : ''}
              tail={item.tail ? 'tail' : ''} />
          </li>
        )}
      </ul> 
    </SolutionLayout>
  );
};
