import {RefObject} from 'react';

export const scrollToBottom = (refContainer: RefObject<HTMLDivElement> | null) => {
  refContainer?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'end'
  });
};
