import {
  useEffect,
  useState,
} from 'react';
import {
  IProps,
  IState,
} from './types';
import StorageHelper from './StorageHelper';

export default function useStoredState<DataType extends IState, KeyType extends keyof DataType>(widgetProps: IProps<DataType>, key: KeyType, defaultValue?: DataType[KeyType]): [DataType[KeyType], (newData: DataType[KeyType]) => void] {
  let initialValue = widgetProps.data[key];
  if (initialValue === undefined) {
    initialValue = defaultValue;
  }
  const [value, setValue] = useState(initialValue);

  const storage = StorageHelper.getInstance();

  useEffect(
    () => {
      // tslint:disable-next-line:no-floating-promises
      storage
        .saveWidgetKey(widgetProps.id, key.toString(), value)
        // Don't care about promise resolution or rejection
        // tslint:disable-next-line:no-empty
        .then(() => {});
    },
    [value],
  );

  function onState(newData: DataType[KeyType]) {
    setValue(newData);

    // Mutate the original object. This is important to avoid weird behaviour
    widgetProps.data[key] = newData;
  }

  return [
    value,
    onState,
  ];
}
