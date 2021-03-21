using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorsService;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace CorsService.Cors
{
    class CorsPolicyProvider: ICorsPolicyProvider
    {
        private ICorsConfig _corsConfig;
        public CorsPolicyProvider(ICorsConfig corsConfig)
        {
            _corsConfig = corsConfig;
        }

        public Task<CorsPolicy> GetPolicyAsync(HttpContext context, string policyName)
        {
            string result = _corsConfig.AllowedHost;


            var allowedHosts = result.Split(",");

            var policy = new CorsPolicyBuilder()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins(allowedHosts)
                        .Build();

            return Task.FromResult(policy);
        }
    }
}
