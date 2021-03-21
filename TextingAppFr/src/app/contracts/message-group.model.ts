import { TextMessageModel } from "./text-message.model";

export interface MessageGroup {
    id: number;
    senderId: number;
    receiverId: number;
    textMessages?: Partial<TextMessageModel>[];
    textMessage: Partial<TextMessageModel>;
}