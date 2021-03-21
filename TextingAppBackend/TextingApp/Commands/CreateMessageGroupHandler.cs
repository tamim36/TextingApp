using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Models.DTO;
using Models.Entities;
using AutoMapper;
using DataManager.Contracts;

namespace BSChat.Commands
{
    public class CreateMessageGroupHandler : IRequestHandler<CreateMessageGroup, CreateMessageGroup>
    {
        private IMapper _mapper;
        private IChatManager _chatManager;

        public CreateMessageGroupHandler(IChatManager chatManager, IMapper mapper)
        {
            _chatManager = chatManager;
            _mapper = mapper;
        }
        public async Task<CreateMessageGroup> Handle(CreateMessageGroup request, CancellationToken cancellationToken)
        {
            var messageGroup = _mapper.Map<MessageGroup>(request);
            bool hasGroup = await _chatManager.HasMessageGroup(messageGroup.SenderId, messageGroup.ReceiverId);
            if (hasGroup) return null;

            var result = await _chatManager.CreateNewGroup(messageGroup);
            var group = _mapper.Map<CreateMessageGroup>(result);
            return group;
        }
    }
}
