import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageGroup } from '@contract/message-group.model';
import { OldMessageModel } from '@contract/old-message.model';
import { TextMessageModel } from '@contract/text-message.model';
import { UserModel } from '@contract/user.model';
import { CoreService } from '@core/core.service';
import { DataStateService } from '@core/servcies/data-state.service';
import { SignalrService } from '@core/services/signalr.service';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { RemoveMessage } from '../../models/removemsg.model';
import { ChatBoxService } from '../../services/chat-box.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedUser: UserModel = null;
  userList: UserModel[] = [];
  displayProfile: boolean = false;
  currentUser: UserModel;
  message: string;
  messageGroup: MessageGroup;
  messageList: Partial<TextMessageModel>[] = [];
  oldMessages: Partial<OldMessageModel>[];
  id: number;
  groupId: number;
  newMesasge: MessageGroup[] = [];

  @ViewChild('textContainer') private textContainer: ElementRef;
  constructor (
    private coreService: CoreService,
    private signalRService: SignalrService,
    private chatBoxService: ChatBoxService,
    private dataState: DataStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.coreService.loadIcons(['like']);
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.listenToMessage();
    this.initMessages();
    this.getuser();
    this.id = parseInt(this.route.snapshot.queryParams.id);
    this.getSelectedUser(this.id);
  }

  ngAfterViewChecked(): void {
    if (this.textContainer) {
      this.textContainer.nativeElement.scrollTop = this.textContainer.nativeElement.scrollHeight;
    }
  }

  createForm() {

  }

  getUserList() {
    return this.chatBoxService.getUserList().pipe(
      tap(res => {
        if (!this.selectedUser && this.id) {
          this.selectedUser = res.find(res => {
            if (res.id == this.id) {
              return res;
            }
          });
        }
        this.userList = res;
      })
    );
  }

  initMessages() {
    let messageInit = [this.getUserList(), this.getOldMessages()];
    forkJoin(messageInit).subscribe(res => {
      this.oldMessages.map(res => {
        if (res.senderId == this.currentUser.id) {
          res.name = this.userList.find(user => user.id == res.receiverId);
        } else if (res.receiverId == this.currentUser.id) {
          res.name = this.userList.find(user => user.id == res.senderId);
        }
      });
      console.log(this.oldMessages); 
    });
  }

  listenToMessage() {
    this.signalRService.chat.subscribe(res => {
      if (res.senderId == this.currentUser.id) {
        this.messageGroup.textMessages.push(res.textMessages);
        this.messageList.push(res.textMessages[0]);
      } else if (this.selectedUser && res.senderId == this.selectedUser.id) {
        this.messageGroup.textMessages.push(res.textMessages);
        this.messageList.push(res.textMessages[0]);
      }
      else {
        this.newMesasge.push(res);
      }
    });
  }

  selectUser(user: UserModel) {
    this.selectedUser = user;
    this.router.navigate(["."], { relativeTo: this.route, queryParams: { id: user.id } });
    this.id = user.id;

    this.getSelectedUser(user.id);
  }

  getSelectedUser(id: number) {
    if (!id) {
      return;
    }
    this.chatBoxService.getOldText(id).subscribe(res => {
      console.log(res);
      if (res == null) {
        this.displayProfile = true;
        this.messageList = [];
      } else {
        this.messageGroup = res;
        console.log(this.messageGroup)
        this.messageList = this.validateMessage(this.messageGroup.textMessages);
      }
      this.groupId = res ? res.id : 0;
    });
  }

  validateMessage(messageList:Partial<TextMessageModel>[]){
    let messages = messageList.filter(msg=>{
      if(msg.senderDelete == 1 && msg.receiverDelete == 1){
        return;
      }else if(msg.senderDelete ==1 && !msg.receiverDelete){
        if(this.currentUser.id == msg.ownerId){
          return;
        }
        return msg;
      }else if(msg.receiverDelete == 1 && !msg.senderDelete){
        if(this.currentUser.id != msg.ownerId){
          return;
        }
        return msg;
      }

      return msg;
    })

    return messages;
  }

  getuser() {
    this.dataState.userState$.subscribe(res => {
      this.currentUser = res;
    });
  }

  sendMessage() {
    this.displayProfile = false;
    let group = this.prepareMessageGroup(this.message);
    group.textMessages = [];
    let payload = this.prepareMessage(this.message);
    group.textMessages.push(payload);

    let path: "new" | "exist" = this.groupId == 0 ? 'new' : "exist";

    if (path == "new") {
      this.sendMessageWithgroup(group).subscribe(res => {
        this.messageGroup.textMessages = [];
        this.messageGroup.textMessages.push(res);
      });
    } else {
      this.chatBoxService.sendMessage("text", group).subscribe(res => {
        console.log(res);
      });
    }

    this.message = "";
  }

  sendMessageWithgroup(group: Partial<MessageGroup>) {
    return this.chatBoxService.createGroup(group).pipe(
      switchMap(res => {
        this.groupId = res.id;
        this.messageGroup = res;

        let payload = this.prepareMessage(group.textMessages[0].sentMessage);
        res.textMessages = [];
        res.textMessages.push(payload);
        return this.chatBoxService.sendMessage("text", res);
      })
    );
  }

  prepareMessageGroup(text: string) {
    let group: Partial<MessageGroup> = {};
    group.senderId = this.currentUser.id;
    group.receiverId = this.id;
    return group;
  }

  prepareMessage(text: string) {
    let message: Partial<TextMessageModel> = {};
    message.ownerId = this.currentUser.id;
    message.sentMessage = text;
    if (this.groupId != 0) {
      message.groupId = this.groupId;
    }
    return message;
  }

  getOldMessages() {
    return this.chatBoxService.getOldMessages().pipe(
      tap(res => {
        this.oldMessages = res;
      })
    );
  }

  deleteMessage(old: OldMessageModel) {
    this.chatBoxService.deleteMessageGroup(old).subscribe(res => {
      let index = this.oldMessages.indexOf(old);
      this.oldMessages.splice(index, 1);
    });
  }

  selectMessage(message: MessageGroup) {
    this.selectedUser = this.userList.find(user => user.id == message.textMessages[message.textMessages.length - 1].ownerId);
    this.router.navigate(["."], { relativeTo: this.route, queryParams: { id: this.selectedUser.id } });
    this.id = this.selectedUser.id;

    this.getSelectedUser(this.selectedUser.id);
    let index = this.newMesasge.indexOf(message);
    this.newMesasge.splice(index, 1);
  }

  getUserFromId(id: number) {
    let value: UserModel = this.userList.find(user => user.id == id);
    console.log(id);
    return value.firstName + " " + value.lastName;
  }

  removeMessage(message, type:'DeleteForEveryone'|'DeleteForMe'){
    let removed:RemoveMessage = message;
    removed.deleteType = type;

    this.chatBoxService.removeTextmsg(removed).subscribe(res=>{
      let index = this.messageList.indexOf(message);
      this.messageList.splice(index,1);
    })
  }

  removeSingleMessageById(id:any){
    let newList = this.messageList.filter(msg=>{
      if(msg.id != id){
        return msg;
      }
    })
    return newList;
  }
}
