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
  arrowRight?: boolean
}
const ListItem = (props: IListItem) => {
  return (
    <div className={`card-list-item ${props.selectable ? '' : 'pointer'}`} onClick={() => {
      if (!props.selectable) {
        props.callback()
      }
    }}>
      <div className={props.isBigIcon ? 'item-text bigicon' : 'item-text'}>
        <div className='main-text'>
          {props.icon ? (<div className={props.isBigIcon ? "text-icon isBig" : "text-icon"}>{props.icon}</div>) : <></>}
          <div className='title-text'>
            {props.text}
            <small className='small-text'>{props.smallText}</small>
          </div>
        </div>
        <div className={props.icon ? 'second-text' : 'second-text no-p-left'}>
          {props.secondryText ? props.children : <></>}
        </div>
      </div>
      <div className='item-icon'>
        {!props.selectable ? (!props.arrowRight ? <></> : <ArrowForwardIosIcon></ArrowForwardIosIcon>)
          :
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