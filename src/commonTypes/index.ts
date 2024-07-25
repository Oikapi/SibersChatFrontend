
export type userLoginData = {
    email : string,
    password : string
}

export interface IUser {
    name : string,
}


export interface IMessage {
    id : number,
    user : {
        id:number,
        name : string
    },
    message : string,
    createdAt : Date
}

export interface IMessageWChannelId extends IMessage{
    channel_id : number
}

export interface IRawMessage {
    id : number,
    user : {
        id:number,
        name : string
    },
    message : string,
    created_at : Date
}



export interface IChannel  {
    id : number,
    name : string,
    messages : IMessage[],
    members : IUser[] | null
}

// export type {userLoginData}