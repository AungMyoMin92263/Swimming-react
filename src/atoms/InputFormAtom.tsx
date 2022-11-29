import React from "react";
import "./InputFormAtom.scss";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
interface IProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  warning: string;
  type: string;
  showWarning: boolean;
  value: string;
  isDropdown: boolean;
  required: boolean;
  maxLength: number;
  callback: Function;
  clickCallback: Function;
  className: string;
  focusCallback?: Function;
  enterCallback?: Function;
  description?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  status?: string;
}

interface IStates {
  isFocus: boolean;
  showDesc: boolean;
}

class InputFormAtom extends React.Component<IProps, IStates> {
  private descNode: HTMLDivElement | null = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFocus: false,
      showDesc: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    console.log('status',this.props.status)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: any) {
    if (
      this.descNode &&
      !this.descNode.contains(event.target) &&
      this.state.showDesc
    ) {
      this.setState({
        showDesc: false,
      });
    }
  }

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    this.props.callback(e.currentTarget.value);
  };

  isFocus = () => {
    if (this.props.focusCallback !== undefined) {
      this.props.focusCallback();
    }
    this.setState({
      isFocus: true,
    });
  };

  focusOut = () => {
    this.setState({
      isFocus: false,
    });
  };

  render() {
    const {
      label,
      showWarning,
      id,
      type,
      name,
      value,
      placeholder,
      required,
      maxLength,
      className,
      clickCallback,
      description,
      isDropdown,
      disabled,
      status,
    } = this.props;

    return (
      <div
        className={`input-form-atom ${showWarning ? "invalid" : ""} ${
          this.state.isFocus ? "focus" : ""
        } ${value !== "" ? "populated" : ""}`}
        onFocus={() => this.isFocus()}
        onBlur={() => this.focusOut()}
      >
        {label !== "" && (
          <div className="label-con">
            <label>{label}</label>
            {description !== undefined && description !== "" && (
              <i
                className="question circle outline icon"
                title="Description"
                onClick={() => this.setState({ showDesc: true })}
              ></i>
            )}
          </div>
        )}
        {!isDropdown && type !== "textarea" && (!status  || status === 'init') && (
          <>
              <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange}
                required={required}
                maxLength={maxLength}
                className={`${className}`}
                onClick={() => clickCallback}
                disabled={disabled ? true : false}
              />
          </>
        )}
        {!isDropdown && type !== "textarea" && status && status === 'success' && (
          <>
            <div className="icon_input">
              <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange}
                required={required}
                maxLength={maxLength}
                className={`${className}`}
                onClick={() => clickCallback}
                disabled={disabled ? true : false}
              />
              <DoneIcon
                sx={{ color: "#67CE67", fontSize: 24, marginLeft: "-32px",marginTop: "16px" }}
              ></DoneIcon>
            </div>
          </>
        )}
        {!isDropdown && type !== "textarea" && status && status === 'error' && (
          <>
            <div className="icon_input">
              <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange}
                required={required}
                maxLength={maxLength}
                className={`${className}`}
                onClick={() => clickCallback}
                disabled={disabled ? true : false}
              />
              <ErrorOutlineIcon
                sx={{ color: "#FF5555", fontSize: 24, marginLeft: "-32px",marginTop: "16px" }}
              ></ErrorOutlineIcon>
            </div>
          </>
        )}
        {!isDropdown && type !== "textarea" && status && status === 'login_password' && (
          <>
            <div className="icon_input">
              <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
                    if (this.props.enterCallback !== undefined) {
                      this.props.enterCallback();
                    }
									}
								}}
                required={required}
                maxLength={maxLength}
                className={`${className}`}
                onClick={() => clickCallback}
                disabled={disabled ? true : false}
              />
            </div>
          </>
        )}
        {!isDropdown && type === "textarea" &&  (
          <>
            <textarea
              id={id}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={this.handleChange}
              required={required}
              maxLength={maxLength}
              className={`${className}`}
              onClick={() => clickCallback}
              disabled={disabled ? true : false}
            ></textarea>
            <span className="counter">
              {value.length}/{maxLength}
            </span>
          </>
        )}

        {isDropdown && this.props.children}
        {/* {showWarning &&
                <div className="warning">
                    <img src="images/warning.png" alt="" />
                    <span>{warning}</span>
                </div>
            } */}
        {!showWarning && this.state.showDesc && (
          <div
            ref={(descNode) => {
              if (descNode !== null) {
                this.descNode = descNode;
              }
            }}
            className="description"
            onBlur={() => this.setState({ showDesc: false })}
          >
            {description}
          </div>
        )}
      </div>
    );
  }
}

export default InputFormAtom;
