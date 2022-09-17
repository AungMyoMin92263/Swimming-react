import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BadgeItem, { IBadgeItem } from '../atoms/BadgeItem';
export interface IBadgeList {
  badges: IBadgeItem[]
}
const BadgeList = (props: IBadgeList) => {
  return (
    <>
      {
        props.badges.length > 0 ?
          < div className='row mb-8' >
            {
              props.badges.map((badge) => {
                return (
                  <div className='col-4'>
                    <BadgeItem {...badge} />
                  </div>
                )
              })
            }
          </div > :
          <div className='no-bagde'>
            <span>There is no badges</span>
          </div>
      }
    </>
  )
}

export default BadgeList