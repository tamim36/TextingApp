using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Models.Entities;

namespace Models.DTO
{
    public class DeleteMessageGroup : IRequest<bool>
    {
        public DeleteMessageGroup()
        {
            TextMessages = new HashSet<TextMessage>();
        }

        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        public ICollection<TextMessage> TextMessages { get; set; }
    }
}
