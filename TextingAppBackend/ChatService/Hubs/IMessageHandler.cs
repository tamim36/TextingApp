using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;

namespace BSChatService.Hubs
{
    public interface IMessageHandler
    {
        Task RecieveMessageAsync(object message);
    }
}
