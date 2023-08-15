import s from './BotMessage.module.scss';
import RoboIcon from '../UI/Icons/RoboIcon.tsx';
import Typewriter from 'typewriter-effect';
import React, {useState} from 'react';
import {clsx} from 'clsx';

interface IProps {
  message: string;
}

function BotMessage({message}: IProps) {
  const [isStopped, setIsStopped] = useState(false);
  const [isHideButton, setIsHideButton] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className={clsx(
        s.buttonWrapper, {
          [s.buttonWrapperHidden]: isStopped || isHideButton
        })}>
        <button
          className={s.stopButton}
          onClick={() => {
            setIsHideButton(true);
            setIsStopped(true);
          }}
        >
          Остановить
        </button>
      </div>
      <div className={s.wrapperInner}>
        <div className={s.avatar}>
          <RoboIcon/>
        </div>
        <div className={clsx(s.message, {[s.messageStopped]: isStopped})}>
          {(message && !(isStopped || isHideButton)) && (
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString(message)
                  .callFunction(() => {
                    setIsHideButton(true);
                  })
                  .start();
              }}
              options={{delay: 18}}
            />
          )}
          {(isHideButton || isStopped) && message}
        </div>
      </div>
    </div>
  );
}

export const MemoizedBotMessage = React.memo(BotMessage);
