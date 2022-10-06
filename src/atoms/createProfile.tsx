import React from 'react';
import { InitialIcon } from "./InitialIcon"

export const CreateProfile = (props: { image_url: string, name: string, isXs?: boolean }) => {
  if (props.image_url && props.image_url !== '') {
    return <img src={props.image_url? process.env.REACT_APP_API_ENDPOINT + "/"+ props.image_url : ""} className="logo-icon" alt=""/>
  } else {
    return <InitialIcon
      initials={props.name.substring(0, 1).toUpperCase()}
      isFooterMenu={true}
      isXs={props.isXs}
    />
  }
}