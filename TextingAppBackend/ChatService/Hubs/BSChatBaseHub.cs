using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace BSChatService.Hubs
{
    [Authorize]
    public class BSChatBaseHub:Hub<IMessageHandler>
    {
        
    }
}
