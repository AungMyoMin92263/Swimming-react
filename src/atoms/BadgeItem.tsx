import React from 'react';
import "./BadgeItem.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IBadgeItem {
  text: string,
  icon: JSX.Element,
  callback: Function,
  isActive?: boolean
}
const BadgeItem = (props: IBadgeItem) => {

  return (
    <div className='cus-badge'>
      {props.icon}
      <label className={props.isActive ? `badge-title active` : `badge-title`}>{props.text}</label>
    </div>
  )


}

export default BadgeItem