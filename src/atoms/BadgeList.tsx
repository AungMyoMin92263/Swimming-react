import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BadgeItem, { IBadgeItem } from './BadgeItem';
export interface IBadgeList {
  badges: IBadgeItem[]
}
const BadgeList = (props: IBadgeList) => {
  return (
    <div className='row'>
      {props.badges.map((badge) => {
        return (
          <div className='col-4'>
            <BadgeItem {...badge} />
          </div>
        )
      })}

    </div>
  )
}

export default BadgeList