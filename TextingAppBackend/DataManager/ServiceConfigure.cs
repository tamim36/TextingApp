using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DataManager.Contracts;
using DataManager.Managers;
using Microsoft.AspNetCore.Http;

namespace DataManager
{
    public static class ServiceConfigure
    {
        public static void AddDatamanager(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<BSChatDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TextingAppDB")));
            services.AddScoped<IAuthDataManager, AuthManager>();
            services.AddScoped<IChatManager, ChatManager>();
            services.AddScoped<IUserDataManager, UserDataManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }
    }
}
