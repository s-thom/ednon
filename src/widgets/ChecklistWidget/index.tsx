import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-check_circle-24px.svg';
import addIcon from '../../assets/sharp-add-24px.svg';
import removeIcon from '../../assets/sharp-close-24px.svg';
import { generateId } from '../../util';
import Input from 'src/components/Input';

interface IChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface IChecklistState {
  title: string;
  items: IChecklistItem[];
}

class ChecklistWidget extends Widget<IChecklistState> {
  static title = 'Check';

  static renderIcon() {
    return (
      <ReactSVG path={iconPath} className="icon" />
    );
  }

  static getDefaultData() {
    return {
      title: 'New List',
      items: [],
    };
  }

  constructor(props: IProps<IChecklistState>) {
    super(props);

    this.state = props.data;
  }

  @autobind
  onTitleValueChange(value: string) {
    this.setState({
      ...this.state,
      title: value,
    });
  }

  @autobind
  onChecklistItemChecked(id: string) {
    const list = [...this.state.items];
    const index = list.findIndex(i => i.id === id);
    list[index] = {
      ...list[index],
      checked: !list[index].checked,
    };

    this.setState({
      ...this.state,
      items: list,
    });
  }

  @autobind
  onChecklistItemTextChange(id: string, text: string) {
    const list = [...this.state.items];
    const index = list.findIndex(i => i.id === id);
    list[index] = {
      ...list[index],
      text,
    };

    this.setState({
      ...this.state,
      items: list,
    });
  }

  @autobind
  onChecklistItemAdd() {
    const list = [...this.state.items];
    list.push({
      id: generateId(),
      text: '',
      checked: false,
    });

    this.setState({
      ...this.state,
      items: list,
    });
  }

  @autobind
  onChecklistItemRemove(id: string) {
    const list = this.state.items.filter(i => i.id !== id);

    this.setState({
      ...this.state,
      items: list,
    });
  }

  render() {
    return (
      <div className="ChecklistWidget">
        <Input
          className="title"
          name={`${this.props.id}-title`}
          id={`${this.props.id}-title`}
          value={this.state.title}
          onChange={this.onTitleValueChange}
        />
        <div className="list">
        {
          this.state.items.map((item) => (
            <div
              key={item.id}
              className="check-item"
            >
              <input
                className="check-check"
                type="checkbox"
                name={`${this.props.id}-${item.id}-check`}
                id={`${this.props.id}-${item.id}-check`}
                checked={item.checked}
                onChange={() => this.onChecklistItemChecked(item.id)}
              />
              <label htmlFor={`${this.props.id}-${item.id}-check`}></label>
              <Input
                className="check-text"
                name={`${this.props.id}-${item.id}-text`}
                id={`${this.props.id}-${item.id}-text`}
                value={item.text}
                onChange={(value) => this.onChecklistItemTextChange(item.id, value)}
              />
              <button
                className="remove"
                onClick={() => this.onChecklistItemRemove(item.id)}
              >
                  <ReactSVG path={removeIcon} className="icon" />
              </button>
            </div>
          ))
        }
        </div>
        <button
          className="add"
          onClick={this.onChecklistItemAdd}
        >
          <ReactSVG path={addIcon} className="icon" />
        </button>
      </div>
    );
  }
}

export default ChecklistWidget;
