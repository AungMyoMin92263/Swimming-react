import React from 'react';
import './ListBox.css'
export interface IListBoxUI {
  title?: string,
  children?: JSX.Element,
  more?: boolean
  callback: Function
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
      {props.more ?
        <div className="list-footer" onClick={() => props.callback()}>
          <label >View All</label>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default ListBoxUI