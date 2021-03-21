using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using CorsService.Cors;

namespace CorsService
{
    public static class MiddlewareConfig
    {
        public static void UseCustomCors(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<CorsMiddlewar>();
        }
    }
}
