import React, {FC, useState, SyntheticEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: FC = () => {

  const [input, setInput] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>([]);

  const getFibonacciNumbers = async (number: number) => {
    let next = 1,
        prev = 0;

    const res: number[] = [];

    for (let i = 0; i <= number; i++) {
      next = prev + next;
      prev = next - prev;

      res.push(prev);
      await delay(SHORT_DELAY_IN_MS);
      setArr([...res]);
    }
  }

  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(+e.currentTarget.value)
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    await getFibonacciNumbers(input)

    setInput(0)
    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleFormSubmit}>
        <div className={style.cont}>
          <Input
            onChange={(e) => changeInput(e)}
            value={input}
            isLimitText={true}
            maxLength={19}
            disabled={isLoading}
            extraClass={style.input}
            type={'number'}
            max={19} />
          <Button
            disabled={input === 0 || input > 19}
            text='Рассчитать'
            type='submit'
            isLoader={isLoading} />
        </div>
      </form>

      <ul className={style.circleContainer}>
        {arr && arr.map((item, index) =>
          <li key={index}>
            <Circle 
              letter={item + ''} 
              index={index} />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
