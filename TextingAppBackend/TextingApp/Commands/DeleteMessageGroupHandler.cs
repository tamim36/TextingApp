using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Models.DTO;
using Models.Entities;
using DataManager.Contracts;
using AutoMapper;

namespace BSChat.Commands
{
    public class DeleteMessageGroupHandler : IRequestHandler<DeleteMessageGroup, bool>
    {
        private IChatManager _chatManager;
        private IMapper _mapper;
        public DeleteMessageGroupHandler(IChatManager chatManager, IMapper mapper)
        {
            _chatManager = chatManager;
            _mapper = mapper;
        }
        public async Task<bool> Handle(DeleteMessageGroup request, CancellationToken cancellationToken)
        {
            var group = _mapper.Map<MessageGroup>(request);
            await _chatManager.DeleteMessage(group);

            return true;
        }
    }
}
