using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;
using MediatR;

namespace Models.DTO
{
    public class GetMessageGroupById : IRequest<MessageGroup>
    {
        public int friendId { get; set; }
        public int myId { get; set; }
    }
}
