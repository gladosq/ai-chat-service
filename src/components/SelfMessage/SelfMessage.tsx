import s from './SelfMessage.module.scss';
import React from 'react';

interface IProps {
  message: string;
}

function SelfMessage({message}: IProps) {

  return (
    <div className={s.wrapper}>
      <div className={s.message}>
        {message}
      </div>
      <div className={s.avatar}>T</div>
    </div>
  );
}

export const MemoizedSelfMessage = React.memo(SelfMessage);
