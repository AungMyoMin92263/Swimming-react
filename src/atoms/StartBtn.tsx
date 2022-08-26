import React from 'react';
interface IStartBtn {
  text: string,
  icon?: JSX.Element,
  callback: Function,
}
const StartBtn = (props: IStartBtn) => {
  return (
    <button
      type="submit"
      className="primary-btn mobile-btn"
      onClick={() => props.callback()}
    >
      <span>{props.text}</span>
      {props.icon}
    </button>
  )
}
export default StartBtn