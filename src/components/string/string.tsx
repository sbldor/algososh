import React, { useState, FC, SyntheticEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css';
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ICharacter } from '../../types/types';
import { reverseString } from './reverse-string'

export const StringComponent: FC = () => {

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stringArr, setStringArr] = useState<ICharacter[]>([]);
  
  // кладем значения инпута в стейт
  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.currentTarget.value);
  };
  // отправка формы (запуск алгоритма)
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const inputArr = input.split('').map((char) => {
      return {
        character: char,
        state: ElementStates.Default
      };
    });
    await reverseString(inputArr, setStringArr);
    setInput('');
    setIsLoading(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleFormSubmit}>
        <div className={style.cont}>
          <Input 
            onChange={(e) => changeInput(e)}
            value={input}
            isLimitText={true}
            maxLength={11}
            disabled={isLoading}
            extraClass={style.input} />
          <Button 
            disabled={input.length < 2}
            text='Развернуть'
            type='submit'
            isLoader={isLoading} />
        </div>
      </form>
      <ul className={style.circleContainer}>
        {stringArr && stringArr.map((item, index) =>
          <li key={index}>
            <Circle 
              letter={item.character} 
              state={item.state} />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
}
