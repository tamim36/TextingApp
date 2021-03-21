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
    public class GetMessageHandler : IRequestHandler<GetMessage, ICollection<MessageGroup>>
    {
        private IChatManager _chatManager;

        public GetMessageHandler(IChatManager chatManager)
        {
            _chatManager = chatManager;
        }

        public async Task<ICollection<MessageGroup>> Handle(GetMessage request, CancellationToken cancellationToken)
        {
            var result = await _chatManager.GetOldMessages(request.Id);
            return result;
        }
    }
}
