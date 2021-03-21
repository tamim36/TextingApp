using MediatR;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class DeleteSingleMessage : IRequest<bool>
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string SentMessage { get; set; }
        public DateTime SentTime { get; set; }
        public int OwnerId { get; set; }
        public byte? SenderDelete { get; set; }
        public byte? ReceiverDelete { get; set; }
        public string DeleteType { get; set; }

        public MessageGroup MessageGroup { get; set; }
    }
}
