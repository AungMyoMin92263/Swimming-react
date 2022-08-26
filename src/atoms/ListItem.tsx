import React from 'react';
import "./ListItem.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IListItem {
  text: string,
  icon?: JSX.Element,
  callback: Function,
  isBigIcon?: boolean
  smallText?: string
  secondryText?: boolean
  selectable?: boolean
  children?: JSX.Element
}
const ListItem = (props: IListItem) => {
  return (
    <div className={`card-list-item ${props.selectable ? '' : 'pointer'}`} onClick={() => {
      if (!props.selectable) {
        props.callback()
      }
    }}>
      <div className='item-text'>
        <div className='main-text'>
          {props.icon ? (<div className={props.isBigIcon ? "text-icon isBig" : "text-icon"}>{props.icon}</div>) : <></>}
          <div className='title-text'>
            {props.text}
            <small className='small-text'>{props.smallText}</small>
          </div>
        </div>
        {/* <div className='second-text'> */}
        {props.secondryText ? props.children : <></>}
        {/* </div> */}
      </div>
      <div className='item-icon'>
        {!props.selectable ?
          <ArrowForwardIosIcon></ArrowForwardIosIcon> :
          <label className="radio-container">
            <input type="checkbox" className='checkbox' />
            <span className="checkmark"></span>
          </label>
        }
      </div>
    </div>
  )
}
export default ListItem