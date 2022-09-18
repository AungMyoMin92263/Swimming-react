import React from 'react';
import "./BestScoreBox.css"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
interface IStartBtn {
  title: string,
  score?: string,
  scoreDate: string,
}
const BestScoreBox = (props: IStartBtn) => {
  return (
    <div className='score-box'>
      <div className='score'>
        <label className='score-count'>{props.score}s</label>
        <span className='scoure-unit'>SECOND</span>
      </div>
      <div className='score-text'>
        <h3 className='score-title'>{props.title}</h3>
        <h3 className='score-date'><CalendarTodayOutlinedIcon fontSize='small' /> <label >{props.scoreDate}</label></h3>
      </div>
    </div>
  )
}
export default BestScoreBox