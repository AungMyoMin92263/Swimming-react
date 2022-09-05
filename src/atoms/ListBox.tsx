import React from 'react';
import './ListBox.css'
export interface IListBoxUI {
  title?: string,
  children?: JSX.Element,
  more?: boolean
  more2?: boolean
  moreText?: string
  moreText2?: boolean,
  callback?: Function
  callback2?: Function
  noBtn?: boolean
}

const ListBoxUI = (props: IListBoxUI) => {
  return (
    <div className="list-box">
      <div className="list-box-title">
        {props.title}
      </div>
      <div className="list-body">
        {props.children}
      </div>
      {props.noBtn ? <></> : <div className="list-footer" >
        {props.more ?
          <label className='box-btn' onClick={() => {
            if (props.callback) {
              props.callback()
            }
          }}>{props.moreText || `View All`}</label>
          :
          <></>
        }
        {props.more2 ?
          <label className='box-btn' onClick={() => {
            if (props.callback2) {
              props.callback2()
            }
          }}>{props.moreText2 || `Add`}</label>
          :
          <></>
        }
      </div>}

    </div>
  )
}

export default ListBoxUI