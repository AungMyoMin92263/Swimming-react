import React from 'react';
import { InitialIcon } from "./InitialIcon"

export const CreateProfile = (props: { image_url: string, name: string }) => {
  if (props.image_url) {
    return <img src={"/assets/icons/logo.png"} className="logo-icon" />
  } else {
    return <InitialIcon
      initials={props.name.substr(0, 1).toUpperCase()}
      isFooterMenu={true}
    />
  }
}