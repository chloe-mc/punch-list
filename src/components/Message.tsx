import React from 'react';
import "./Message.scss";

interface Props {
	message: string
}
const Message: React.FC<Props> = (props) => {
	return (
		<div className="Message-box">
			<p>{props.message}</p>
		</div>
	)
}

export default Message;
