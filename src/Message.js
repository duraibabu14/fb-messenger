import React,{forwardRef} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./Message.css"

const Message = forwardRef( ({message,user} , ref) =>{
    const isUser = user === message.user;
    return (
        <div ref={ref} className={`message ${isUser&& `message__user `}`}>
            <Card className={isUser ? "message__usercard" : "message__guestcard"}>
                <CardContent>
                    <Typography color="white" variant="h5"component="h2">
                        {!isUser && ` ${message.user || 'Unkown'}: `} {message.message}
                    </Typography>
                 </CardContent>
            </Card>
        </div>    
        
    )
}
)
export default Message
