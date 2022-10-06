import React from 'react';
import "./ListItem.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { setItemWithObject } from './../auth/LocalStorage';
export interface IListItem {
	text?: string;
	icon?: JSX.Element;
	callback: Function;
	isBigIcon?: boolean;
	smallText?: string;
	secondryText?: boolean;
	selectable?: boolean;
	children?: JSX.Element;
	arrowRight?: boolean;
	checked?: boolean;
	chooseCallBack?: Function;
	noMainText?: boolean;
	isSlot?: boolean;
  slot?: any;
  isBooking?: boolean;
}
const ListItem = (props: IListItem) => {
  return (
    <div className={`${props.isBooking ? 'card-list-booking' : 'card-list-item '} ${props.selectable ? '' : 'pointer'}`} onClick={() => {
      
      if (!props.selectable) {
        if (!props.isSlot) props.callback();
				else {
          setItemWithObject("selected-slot", props.slot);
          props.callback();
				}
      }
    }}>
      <div className={props.isBigIcon ? 'item-text bigicon' : 'item-text'}>
        {props.noMainText ? <></> :
          <div className='main-text'>
            {props.icon ? (<div className={props.isBigIcon ? "text-icon isBig" : "text-icon"}>{props.icon}</div>) : <></>}
            <div className='title-text'>
              {props.text}
              <small className='small-text'>{props.smallText}</small>
            </div>
          </div>
        }
        <div className={`${props.icon ? 'second-text' : 'second-text no-p-left'} ${props.isBooking ? 'text-left' : ''}`}>
          {props.secondryText ? props.children : <></>}
        </div>
      </div>
      <div className='item-icon'>
        {!props.selectable ? (!props.arrowRight ? <></> : <ArrowForwardIosIcon></ArrowForwardIosIcon>)
          :
          <label className="radio-container">
            <input type="checkbox" value='true' checked={props.checked === true} className='checkbox' onChange={(e) => {
              if (props.chooseCallBack) {
                props.chooseCallBack(e.target.checked)
              }
            }} />
            <span className="checkmark"></span>
          </label>
        }
      </div>
    </div>
  )
}
export default ListItem