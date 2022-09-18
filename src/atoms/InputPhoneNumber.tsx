import React from "react";
import './InputFormAtom.scss';

interface IProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  warning: string;
  showWarning: boolean;
  value: string;
  required: boolean;
  maxLength: number;
  callback: Function;
  clickCallback: Function;
  className: string;
  focusCallback?: Function;
  description?: string;
  children?: React.ReactNode
}

interface IStates {
  isFocus: boolean;
  showDesc: boolean;
}
export class InputPhoneNumber extends React.Component<IProps, IStates> {
  start = 0
  private descNode: HTMLDivElement | null = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFocus: false,
      showDesc: false,
    };
    this.start = 0
  }


  onAmountChange = (e: any) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^[\+]?[0-9]{0,}[-\s\.]?[0-9]{0,}[-\s\.]?[0-9]{0,}$/)) {
      this.props.callback(amount);
    }
  };

  // blur = e => {
  //   const val = e.target.value;
  //   if (val.length > 0) {
  //     e.target.value = Number(val).toFixed(2);
  //     this.setState({ input: e.target.value });
  //   }
  // };
  isFocus = () => {
    if (this.props.focusCallback !== undefined) {
      this.props.focusCallback();
    }
    this.setState({
      isFocus: true,
    });
  }

  focusOut = () => {
    this.setState({
      isFocus: false,
    });
  }

  render() {
    const {
      label,
      showWarning,
      id,
      name,
      value,
      placeholder,
      required,
      maxLength,
      className,
      clickCallback,
      description,
    } = this.props;
    return (
      <div className={`input-form-atom ${showWarning ? 'invalid' : ''} ${this.state.isFocus ? 'focus' : ''} ${value !== '' ? 'populated' : ''}`} onFocus={() => this.isFocus()} onBlur={() => this.focusOut()}>
        {label !== '' &&
          <div className="label-con">
            <label>{label}</label>
            {(description !== undefined && description !== '') &&
              <i className="question circle outline icon" title="Description" onClick={() => this.setState({ showDesc: true })}></i>
            }
          </div>
        }
          <input
            id={id}
            type='tel'
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={this.onAmountChange}
            required={required}
            maxLength={maxLength}
            className={`${className} `}
            onClick={() => clickCallback}
          />
        {(!showWarning && this.state.showDesc) &&
          <div ref={descNode => {
            if (descNode !== null) {
              this.descNode = descNode
            }
          }} className="description" onBlur={() => this.setState({ showDesc: false })}>{description}</div>}
      </div>
      // <div>
      //   <input
      //     type="text"
      //     value={value}
      //     onChange={this.change}
      //   />
      // </div>
    );
  }
}
