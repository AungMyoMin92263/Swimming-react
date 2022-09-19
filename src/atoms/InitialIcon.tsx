export interface InitialIconInterface {
	initials: string;
	isFooterMenu: boolean;
	isInitialIcon?: boolean;
	isBig?: boolean
}
export const InitialIcon = (props: InitialIconInterface) => {
	var colors = [
		"#ff0000",
		"#00ff00",
		"#0000ff",
		"#ff3333",
		"#ffff00",
		"#ff6600",
		"#051e3e",
		"#251e3e", "#451e3e", "#651e3e", "#851e3e"
	];

	// selecting random color
	var name = props.initials;
	// console.log(Math.abs(name.charCodeAt(0) % colors.length))
	var random_color = colors[Math.abs(name.charCodeAt(0) % colors.length)];
	// var random_color = colors[Math.floor(name.length / colors.length)];
	if (props.isFooterMenu) {
		return (
			<div
				style={{
					display: "flex",
					backgroundColor: random_color,
					alignItems: "center",
					justifyContent: "center",
					textAlign: 'center',
					borderRadius: "50%",
					width: 24,
					height: 24,
				}}
			>
				<span style={{ color: "white", fontSize: '14px' }}>{props.initials ? props.initials : ''}</span>
			</div>
		);
	} else
		return (
			<div
				className={`${props.isInitialIcon ? "initial-big-icon cursor mb-8" : "initial-icon"} isBig-${props.isBig}`}
				style={{ backgroundColor: random_color }}
			>
				<span style={{ color: "white", fontSize: props.isInitialIcon ? 50 : 20 }}>{props.initials ? props.initials : ''}</span>
			</div>
		);
};

export const InitialIconList = (props: InitialIconInterface) => {
	var colors = [
		"#ff0000",
		"#00ff00",
		"#0000ff",
		"#ff3333",
		"#ffff00",
		"#ff6600",
		"#051e3e",
		"#251e3e", "#451e3e", "#651e3e", "#851e3e"
	];

	// selecting random color
	var name = props.initials;
	// console.log(Math.abs(name.charCodeAt(0) % colors.length))
	var random_color = colors[Math.abs(name.charCodeAt(0) % colors.length)];
	// var random_color = colors[Math.floor(name.length / colors.length)];
	if (props.isFooterMenu) {
		return (
			<div
				style={{
					display: "flex",
					backgroundColor: random_color,
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					borderRadius: "50%",
					width: 40,
					height: 40,
					
				}}
			>
				<span style={{ color: "white", fontSize: "14px" }}>
					{props.initials ? props.initials : ""}
				</span>
			</div>
		);
	} else
		return (
			<div
				className={`${
					props.isInitialIcon ? "initial-big-icon cursor mb-8" : "initial-icon"
				} isBig-${props.isBig}`}
				style={{ backgroundColor: random_color, marginLeft: "-8px" }}
			>
				<span
					style={{ color: "white", fontSize: props.isInitialIcon ? 50 : 20 }}
				>
					{props.initials ? props.initials : ""}
				</span>
			</div>
		);
};

