using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;

namespace TokenService.Contracts
{
    public interface ITokenGenerator
    {
        public Task<string> GenerateJwtToken(Claim[] claims, string secreteKey, DateTime expireTime);
    }
}
