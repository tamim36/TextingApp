using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Models.Entities
{
    public class MessageGroup : IRequest<TextMessage>
    {
        public MessageGroup()
        {
            TextMessages = new HashSet<TextMessage>();
        }

        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        public ICollection<TextMessage> TextMessages { get; set; }
    }
}
