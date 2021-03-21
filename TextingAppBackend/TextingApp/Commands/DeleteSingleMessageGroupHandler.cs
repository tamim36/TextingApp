using AutoMapper;
using DataManager.Contracts;
using MediatR;
using Models.DTO;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BSChat.Commands
{
    public class DeleteSingleMessageGroupHandler : IRequestHandler<DeleteSingleMessage ,bool>
    {
        private IChatManager _chatManager;
        private IMapper _mapper;
        public DeleteSingleMessageGroupHandler(IChatManager chatManager, IMapper mapper)
        {
            _chatManager = chatManager;
            _mapper = mapper;
        }
        public async Task<bool> Handle(DeleteSingleMessage request, CancellationToken cancellationToken)
        {
            string deleteType = request.DeleteType;
            var message = _mapper.Map<TextMessage>(request);
            await _chatManager.DeleteSingleMessage(message, deleteType);

            return true;
        }
    }
}
