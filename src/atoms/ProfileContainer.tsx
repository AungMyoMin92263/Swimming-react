import React from "react";
import "./ProfileContainer.css"

export interface IProfileItem {
	title: string
	value: string
}
export interface IProfile {
	isLogo?: boolean
	logo?: string
	title: string
	display_item?: IProfileItem[]
}

const ProfileContainer = (props: IProfile) => {
	let firstLetter = (props.title || "").match(/\b\w/g)?.join('').slice(0, 2)
	return (
		<div className='profile-group'>
			{props.isLogo ? (
				<div className='profile-logo'>
					{props.logo ? <img src={process.env.REACT_APP_API_ENDPOINT + "/" + props.logo} /> : firstLetter}
				</div>
			) : (
				<></>
			)}
			<div className='profile-tile'>{props.title}</div>
			<div className='row pb-24 pt-40'>
				{props.display_item && props.display_item.length > 0 && props.display_item.map((item, index) => {
					return (
						<div className='col-6' key={`profile-item ${index}`}>
							<span className='item-text'>{item.title}</span>
							<h3 className='item-value'>{item.value}</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default ProfileContainer