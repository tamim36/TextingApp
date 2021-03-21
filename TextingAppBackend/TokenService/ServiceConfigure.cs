using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TokenService.Contracts;
using TokenService.Services;

namespace TokenService
{
    public static class ServiceConfigure
    {
        public static void AddJWTTokenService(this IServiceCollection services, IConfiguration Configuration)
        {
            var jwtSection = Configuration.GetSection(nameof(JwtSecrets));
            services.Configure<JwtSecrets>(jwtSection);
            services.AddSingleton<IJwtSecrets>(secrets => secrets.GetRequiredService<IOptions<JwtSecrets>>().Value);
            var jwtSecrets = jwtSection.Get<JwtSecrets>();
            var key = Encoding.ASCII.GetBytes(jwtSecrets.TokenSecrete);

            services.AddSingleton<ITokenGenerator, TokenGenerator>();

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(auth =>
            {
                auth.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Query["access_token"];
                        if (string.IsNullOrEmpty(token) == false)
                        {
                            context.Token = token;
                        }
                        return Task.CompletedTask;
                    }
                };

                auth.RequireHttpsMetadata = false;
                auth.SaveToken = false;
                auth.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireSignedTokens = true,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                };
            });
        }
    }
}
