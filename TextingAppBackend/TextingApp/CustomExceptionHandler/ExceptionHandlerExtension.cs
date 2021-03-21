using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace BSChat.CustomExceptionHandler
{
    public static class ExceptionHandlerExtension
    {
        public static IApplicationBuilder UseCustomExtensionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandler>();
        }
    }
}
