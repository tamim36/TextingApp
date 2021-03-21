using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Models.Entities;
using Models.DTO;
using System.Threading;
using DataManager.Contracts;

namespace BSChat.Commands
{
    public class GetMessageGroupHandler : IRequestHandler<GetMessageGroupById, MessageGroup>
    {
        private IChatManager _chatManager;
        public GetMessageGroupHandler(IChatManager chatManager)
        {
            _chatManager = chatManager;
        }
        public async Task<MessageGroup> Handle(GetMessageGroupById request, CancellationToken cancellationToken)
        {
            var result = await _chatManager.GetMessageGroup(request.friendId, request.myId);
            return result;
        }
    }
}
