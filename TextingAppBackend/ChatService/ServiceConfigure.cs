using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SignalR;
using BSChatService.Configs;

namespace BSChatService
{
    public static class ServiceConfigure
    {
        public static void AddBSChatService(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddSingleton<IUserIdProvider, UserIdProvider>();
        }
    }
}
