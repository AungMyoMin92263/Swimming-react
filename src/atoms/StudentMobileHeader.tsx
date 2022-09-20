import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "./CoachMobileHeader.css"
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { removeItem } from '../auth/LocalStorage';
interface ICoachMobileHeader {
  title?: boolean,
  backBtn?: boolean,
  addBtn?: boolean
  filterBtn?: boolean
  editBtn?: boolean
  callback?: Function
}
function logoutFun () {
  removeItem('authUser')
  window.location.replace('/coach/login')
}
const CoachMobileHeader = (props: ICoachMobileHeader) => {
  const navigate = useNavigate();
 
  return (
    <div className="header-box primary f-16 fw-500 text-center pt-16 pb-16 ">
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
      {props.addBtn ? <>
        <button className='back-icon-btn add-btn' onClick={() => {
          if (props.callback) {
            props.callback()
          }
        }}><AddOutlinedIcon />
        </button>
      </> : <></>}

      {props.filterBtn ? <>
        <button className='back-icon-btn add-btn' onClick={() => {
          if (props.callback) {
            props.callback()
          }
        }}><FilterListOutlinedIcon />
        </button>
      </> : <></>}

      {props.editBtn ? <>
        {/* <button className='back-icon-btn add-btn' onClick={() => {
          if (props.callback) {
            props.callback()
          }
        }}><FilterListOutlinedIcon />
        </button> */}
        <Dropdown className='custom-dropdown'>
          <Dropdown.Toggle id="dropdown-basic" className='add-btn'>
            <MoreVertIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate('/student/me/edit-profile')} >
              <ModeEditOutlineOutlinedIcon fontSize='small' /> <span>Edit Profile</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => logoutFun()}> <LogoutOutlinedIcon fontSize='small' /><span>Logout</span></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </> : <></>}

    </div>
  )
}
export default CoachMobileHeader