import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import { IProps } from '../../types';
import iconPath from '../../assets/sharp-check_circle-24px.svg';
import addIcon from '../../assets/sharp-add-24px.svg';
import removeIcon from '../../assets/sharp-close-24px.svg';
import { generateId } from '../../util';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import useStoredState from '../../useStoredState';

interface IChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}
interface IChecklistItemProps {
  item: IChecklistItem;
  onTextChange: (value: string) => void;
  onCheckedChange: (value: boolean) => void;
  onRemoveClicked: () => void;
}

interface IChecklistState {
  title: string;
  items: IChecklistItem[];
}

function ChecklistItem(props: IChecklistItemProps) {
  const classes = [
    'Checklist-item',
  ];
  if (props.item.checked) {
    classes.push('checked');
  }

  return (
    <div
      className={classes.join(' ')}
    >
      <Checkbox
        checked={props.item.checked}
        id={props.item.id}
        name={`${props.item.id}-check`}
        onChange={props.onCheckedChange}
      />
      <Input
        className="check-text"
        name={`${props.item.id}-text`}
        id={`${props.item.id}-text`}
        value={props.item.text}
        onChange={props.onTextChange}
      />
      <button
        className="remove"
        onClick={props.onRemoveClicked}
      >
          <ReactSVG path={removeIcon} className="icon" />
      </button>
    </div>
  );
}

export default function ChecklistWidget(props: IProps<IChecklistState>) {
  const [title, setTitle] = useStoredState(props, 'title', 'New Checklist');
  const [items, setItems] = useStoredState(props, 'items', []);

  function onTitleValueChange(value: string) {
    setTitle(value);
  }

  function onChecklistItemAdd() {
    const newArr = items.slice();
    newArr.push({
      id: generateId(),
      text: '',
      checked: false,
    });

    setItems(newArr);
  }

  function onChecklistItemRemove(itemId: string) {
    const newArr = items.filter((i) => i.id !== itemId);
    setItems(newArr);
  }

  function onChecklistItemTextChange(itemId: string, value: string) {
    const newArr = items.slice();

    const item = newArr.find((i) => i.id === itemId);
    if (item) {
      item.text = value;
      setItems(newArr);
    }
  }

  function onChecklistItemChecked(itemId: string) {
    const newArr = items.slice();

    const item = newArr.find((i) => i.id === itemId);
    if (item) {
      item.checked = !item.checked;
      setItems(newArr);
    }
  }

  return (
    <div className="ChecklistWidget">
      <Input
        className="title"
        name={`${props.id}-title`}
        id={`${props.id}-title`}
        value={title}
        onChange={onTitleValueChange}
      />
      <div className="list">
      {
        items.map((item) => (
          <ChecklistItem
            item={item}
            onTextChange={(value) => onChecklistItemTextChange(item.id, value)}
            onCheckedChange={() => onChecklistItemChecked(item.id)}
            onRemoveClicked={() => onChecklistItemRemove(item.id)}
          />
        ))
      }
      </div>
      <button
        className="add"
        onClick={onChecklistItemAdd}
      >
        <ReactSVG path={addIcon} className="icon" />
      </button>
    </div>
  );
}
