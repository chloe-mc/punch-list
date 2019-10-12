import React from 'react';
import "./Message.css";

export default function Message(props) {
	return (
		<div className="Message-box">
			<p>{props.message}</p>
		</div>
	)
}
