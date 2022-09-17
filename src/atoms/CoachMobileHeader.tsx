import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CoachMobileHeader.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface ICoachMobileHeader {
  title?: boolean,
  backBtn?: boolean,
}
const CoachMobileHeader = (props: ICoachMobileHeader) => {
  const navigate = useNavigate();
  return (
    <div className="header-box primary f-16 fw-500 text-center pt-24 pb-24 ">
      {props.backBtn ? <>
        {/* <Link to="/coach/dashboard">
          <button type="submit" className="back-btn">
            <ArrowBackIcon
              sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
            ></ArrowBackIcon>
          </button>
        </Link> */}
        <button className='back-icon-btn action-btn' onClick={() => navigate(-1)}><KeyboardBackspaceIcon /></button>
      </> : <></>}
      {props.title ? <><span>My Report Cards</span></> : <></>}

    </div>
  )
}
export default CoachMobileHeader