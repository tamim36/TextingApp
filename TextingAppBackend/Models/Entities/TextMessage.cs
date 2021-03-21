using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class TextMessage
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string SentMessage { get; set; }
        public DateTime SentTime { get; set; }
        public int OwnerId { get; set; }
        public byte? SenderDelete { get; set; }
        public byte? ReceiverDelete { get; set; }

        public MessageGroup MessageGroup { get; set; }
    }
}
