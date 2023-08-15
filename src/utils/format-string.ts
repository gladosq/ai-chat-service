interface IChank {
  status: string;
  value: string;
}

export const formatMessageToString = (array: IChank[]) => {
  return array.reduce((acc: string, current: IChank) => {
    if (current.status === 'content') {
      acc = acc + current.value;
    }

    return acc;
  }, '');
}
