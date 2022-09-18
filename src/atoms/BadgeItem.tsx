import React from 'react';
import "./BadgeItem.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IBadgeItem {
  text?: string,
  icon: string,
  color?: string
  callback: Function,
  isActive?: boolean,
  isSelected?: boolean
  isBig?: boolean
}
const BadgeItem = (props: IBadgeItem) => {

  return (
    <div className='cus-badge'>
      <div className={`badge-icon-box isBig-${props.isBig}  bg-${props.color} active-${props.isSelected}`} onClick={() => props.callback()}>
        <img src={props.icon} alt="" />
      </div>
      {props.text ? <label className={props.isActive ? `badge-title active` : `badge-title`}>{props.text}</label> : <></>}
    </div>
  )


}

export default BadgeItem