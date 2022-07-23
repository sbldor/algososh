import React, { FC, useState, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { LinkedList } from "./list";

interface IListItem {
  name: string;
  state: ElementStates;
  smallCircle: ISmallCircle | null;
};

interface ISmallCircle {
  name: string;
  state: ElementStates;
  positioning: 'topCircle' | 'bottomCircle';
};

export const ListPage: FC = () => {

  const initialList = ['0', '34', '8', '1']
  const defaultListArr: IListItem[] = initialList.map(item => ({
    name: item,
    state: ElementStates.Default,
    smallCircle: null,
  }))

  const [value, setValue] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<string>('none');
  const [listArr, setListArr] = useState<IListItem[]>(defaultListArr);

  const newList = new LinkedList<string>(initialList);
  // сохранение значение инпута value
  const changeValue = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };
  // сохранение значения инпута с индексом
  const changeIndex = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIndex(+e.currentTarget.value);
  };
  // добавить в начало
  const addToHead = async () => {

    setIsLoading('addHead');
    newList.prepend(value);

    if (listArr.length > 0) {
      listArr[0].smallCircle = {
        name: value,
        state: ElementStates.Changing,
        positioning: 'topCircle',
      };
    };

    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr[0].smallCircle = null;

    listArr.unshift({
      ...listArr[0],
      name: value,
      state: ElementStates.Modified,
    });

    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr[0].state = ElementStates.Default;

    setListArr([...listArr]);
    setValue('');
    setIsLoading('none');
  };
  // добавить в конец
  const addToTail = async () => {

    setIsLoading('addTail');
    newList.append(value);
    const savedLen = listArr.length;

    listArr[savedLen - 1] = {
      ...listArr[savedLen - 1],
      smallCircle: {
        name: value,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    };

    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr[savedLen - 1] = {
      ...listArr[savedLen - 1],
      smallCircle: null,
    }

    listArr.push({
      name: value,
      state: ElementStates.Modified,
      smallCircle: null,
    })

    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr[savedLen].state = ElementStates.Default;

    setListArr([...listArr]);
    setValue('');
    setIsLoading('none');
  };
  // удалить из начала
  const removeFromHead = async () => {

    setIsLoading('dellHead');

    listArr[0] = {
      ...listArr[0],
      name: '',
      smallCircle: {
        name: listArr[0].name,
        state: ElementStates.Changing,
        positioning: 'topCircle',
      },
    }

    newList.removeAt(0);
    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr.shift();
    setListArr([...listArr]);
    setIsLoading('none');
  };
  // удалить с конца
  const removeFromTail = async () => {

    setIsLoading('dellTail');

    listArr[listArr.length - 1] = {
      ...listArr[listArr.length - 1],
      name: '',
      smallCircle: {
        name: listArr[listArr.length - 1].name,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    };

    newList.removeAt(newList.getSize());
    setListArr([...listArr]);

    await delay(SHORT_DELAY_IN_MS);

    listArr.pop();
    setListArr([...listArr]);
    setIsLoading('none');
  };
  // добавить по индексу
  const addByIndex = async () => {

    setIsLoading('addIndex');
    newList.insertAt(value, index);

    for (let i = 0; i <= index; i++) {
      listArr[i] = {
        ...listArr[i],
        state: ElementStates.Changing,
        smallCircle: {
          name: value,
          state: ElementStates.Changing,
          positioning: 'topCircle',
        },
      }

      await delay(SHORT_DELAY_IN_MS);

      if (i > 0) listArr[i - 1] = { ...listArr[i - 1], smallCircle: null };
      setListArr([...listArr]);
    }

    await delay(SHORT_DELAY_IN_MS);

    listArr[index] = {
      ...listArr[index],
      state: ElementStates.Default,
      smallCircle: null,
    };

    listArr.splice(index, 0, {
      name: value,
      state: ElementStates.Modified,
      smallCircle: null,
    })

    setListArr([...listArr]);

    listArr[index].state = ElementStates.Default;
    listArr.forEach((item: IListItem) => {
      item.state = ElementStates.Default
    });

    await delay(SHORT_DELAY_IN_MS);

    setListArr([...listArr]);
    setValue('');
    setIndex(0);
    setIsLoading('none');
  };
  // удалить по индексу
  const removeByIndex = async () => {

    setIsLoading('dellIndex');
    newList.removeAt(index);

    for (let i = 0; i <= index; i++) {
      listArr[i] = {
        ...listArr[i],
        state: ElementStates.Changing,
      };

      await delay(SHORT_DELAY_IN_MS);

      setListArr([...listArr])
    }

    listArr[index] = {
      ...listArr[index],
      name: '',
      smallCircle: {
        name: listArr[index].name,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    };

    await delay(SHORT_DELAY_IN_MS);

    setListArr([...listArr]);

    listArr.splice(index, 1)
    listArr[index - 1] = {
      ...listArr[index - 1],
      name: listArr[index - 1].name,
      state: ElementStates.Changing,
      smallCircle: null,
    }

    await delay(SHORT_DELAY_IN_MS);

    setListArr([...listArr]);
    listArr.forEach(item => item.state = ElementStates.Default);

    await delay(SHORT_DELAY_IN_MS);
    setListArr([...listArr]);
    setIndex(0);
    setIsLoading('none');
  }
  // отключение кнопок
  const isDisabled = (order: string) => {
    return isLoading !== order && isLoading !== 'none'
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={style.cont}>
        <form className={style.controlsCont} onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Введите значение"
            extraClass={style.input}
            onChange={changeValue}
            value={value}
            disabled={isLoading !== 'none'}
            isLimitText={true}
            maxLength={4} />
          <Button
            text="Добавить в head"
            type="button"
            extraClass={style.buttonSmall}
            isLoader={isLoading === 'addHead'}
            disabled={value === '' || listArr.length >= 8 || isDisabled('addHead')}
            onClick={addToHead}
          />
          <Button
            text="Добавить в tail"
            type="button"
            extraClass={style.buttonSmall}
            isLoader={isLoading === 'addTail'}
            disabled={value === '' || listArr.length >= 8 || isDisabled('addTail')}
            onClick={addToTail}
          />
          <Button
            text="Удалить из head"
            type="button"
            extraClass={style.buttonSmall}
            isLoader={isLoading === 'dellHead'}
            disabled={listArr.length <= 1 || isDisabled('dellHead')}
            onClick={removeFromHead}
          />
          <Button
            text="Удалить из tail"
            type="button"
            extraClass={style.buttonSmall}
            isLoader={isLoading === 'dellTail'}
            disabled={listArr.length <= 1 || isDisabled('dellTail')}
            onClick={removeFromTail}
          />
        </form>
        <form className={style.controlsCont} onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Введите индекс"
            extraClass={style.input}
            maxLength={1}
            onChange={changeIndex}
            disabled={isLoading !== 'none'}
            value={index || ''}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            extraClass={style.button}
            isLoader={isLoading === 'addIndex'}
            onClick={addByIndex}
            disabled={value === '' || !index || listArr.length >= 8 || index > listArr.length - 1 || isDisabled('addIndex')}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            extraClass={style.button}
            isLoader={isLoading === 'dellIndex'}
            onClick={removeByIndex}
            disabled={listArr.length <= 1 || !index || index > listArr.length - 1 || isDisabled('dellIndex')}
          />
        </form>
      </div>

      <ul className={style.circleCont}>
        {listArr.map((item, index) => (
          <li className={style.circle} key={index}>
            {item.smallCircle && (
              <Circle
                extraClass={`${style.smallCircle} ${style[`${item.smallCircle.positioning}`]}`}
                letter={item.smallCircle.name}
                isSmall
                state={item.smallCircle.state} />
            )}

            {index !== 0 &&
              <ArrowIcon fill={item.state === ElementStates.Changing ? "#d252e1" : "#0032FF"} />}

            <Circle
              tail={(!item.smallCircle && index === listArr.length - 1) ? 'tail' : ''}
              letter={item.name}
              index={index}
              head={!item.smallCircle && index === 0 ? 'head' : ''}
              state={item.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
