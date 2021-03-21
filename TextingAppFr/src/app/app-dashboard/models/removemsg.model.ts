export interface RemoveMessage{
    groupId:number;
    id: number;
    ownerId: number;
    receiverDelete: boolean;
    senderDelete: boolean;
    sentMessage: string;
    sentTime: string;
    deleteType:"DeleteForMe"|"DeleteForEveryone";
}