import { TextMessageModel } from "./text-message.model";
import { UserModel } from "./user.model";

export interface OldMessageModel {
    id: number;
    senderId: number;
    receiverId: number;
    textMessages?: Partial<TextMessageModel>[];
    textMessage: Partial<TextMessageModel>;
    name: UserModel;
}