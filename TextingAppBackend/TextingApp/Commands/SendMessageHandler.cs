using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Models.Entities;
using DataManager.Contracts;
using Microsoft.AspNetCore.SignalR;
using BSChatService.Hubs;

namespace BSChat.Commands
{
    public class SendMessageHandler : IRequestHandler<MessageGroup, TextMessage>
    {
        private IChatManager _chatManager;
        private IHubContext<BSChatBaseHub, IMessageHandler> _hubContext;
        public SendMessageHandler(IChatManager chatManager, IHubContext<BSChatBaseHub, IMessageHandler> hubContext)
        {
            _chatManager = chatManager;
            _hubContext = hubContext;
        }
        public async Task<TextMessage> Handle(MessageGroup request, CancellationToken cancellationToken)
        {
            var message = request.TextMessages.First();
            message.SentTime = DateTime.Now;

            var result = await _chatManager.StoreInExistingGroup(message);
            request.TextMessages.Add(result);
            await _hubContext.Clients.User(request.SenderId.ToString()).RecieveMessageAsync(request);
            await _hubContext.Clients.User(request.ReceiverId.ToString()).RecieveMessageAsync(request);

            return result;
        }
    }
}
