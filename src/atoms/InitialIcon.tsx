export interface InitialIconInterface {
	initials:string;
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
            "#251e3e" , "#451e3e" , "#651e3e" , "#851e3e"
		];
   
		// selecting random color
		var random_color = colors[Math.floor(Math.random() * colors.length )];
	return (
		<div
			style={{
                display:"flex",
				backgroundColor: random_color,
				alignItems: "center",
				justifyContent: "center",
                textAlign:'center',
				borderRadius: "50%",
				width: 40,
				height: 40,
			}}
		>
			<span style={{ color: "white", fontSize: 20 }}>{props.initials}</span>
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
		"#251e3e",
		"#451e3e",
		"#651e3e",
		"#851e3e",
	];

	// selecting random color
	var random_color = colors[Math.floor(Math.random() * colors.length)];
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
				marginLeft:"-8px",
			}}
		>
			<span style={{ color: "white", fontSize: 20 }}>{props.initials}</span>
		</div>
	);
};

