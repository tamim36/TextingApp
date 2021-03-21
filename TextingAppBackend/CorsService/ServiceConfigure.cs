using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors.Infrastructure;
using CorsService.Cors;

namespace CorsService
{
    public static class ServiceConfigure
    {
        public static void AddCorsPolicy(this IServiceCollection services, IConfiguration Configuration)
        {
            services.Configure<CorsConfig>(Configuration.GetSection(nameof(CorsConfig)));
            services.AddSingleton<ICorsConfig>(config => config.GetRequiredService<IOptions<CorsConfig>>().Value);
            services.AddCors();
            services.AddSingleton<ICorsPolicyProvider, CorsPolicyProvider>();
        }
    }
}
