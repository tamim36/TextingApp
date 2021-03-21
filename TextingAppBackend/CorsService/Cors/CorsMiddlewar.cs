using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace CorsService.Cors
{
    class CorsMiddlewar
    {
        private readonly RequestDelegate _next;
        private readonly ICorsService _corsService;
        private readonly ICorsPolicyProvider _corsPolicyProvider;
        private readonly string _corsPolicyName = "CustomPolicy";

        public CorsMiddlewar(RequestDelegate next,
                                    ICorsService corsService,
                                    ICorsPolicyProvider corsPolicyProvider)
        {
            _next = next;
            _corsService = corsService;
            _corsPolicyProvider = corsPolicyProvider;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey(CorsConstants.Origin))
            {
                var policy = await _corsPolicyProvider.GetPolicyAsync(context, _corsPolicyName);
                if (policy != null)
                {
                    var result = _corsService.EvaluatePolicy(context, policy);
                    _corsService.ApplyResult(result, context.Response);

                    var accessControlRequestMethod =
                   context.Request.Headers[CorsConstants.AccessControlRequestMethod];

                    if (string.Equals(context.Request.Method, CorsConstants.PreflightHttpMethod, StringComparison.Ordinal)
                                        && !StringValues.IsNullOrEmpty(accessControlRequestMethod))
                    {
                        context.Response.StatusCode = StatusCodes.Status204NoContent;
                        return;
                    }
                }
            }

            await _next(context);
        }
    }
}
