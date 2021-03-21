using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TokenService.Contracts;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace TokenService.Services
{
    class TokenGenerator : ITokenGenerator
    {
        private JwtSecurityTokenHandler tokenHandler;
        private SecurityTokenDescriptor tokenDescriptor;

        public TokenGenerator(IJwtSecrets jwtSecrets)
        {
            tokenHandler = new JwtSecurityTokenHandler();
        }
        public async Task<string> GenerateJwtToken(Claim[] claims, string secreteKey, DateTime expireTime)
        {
            var key = Encoding.ASCII.GetBytes(secreteKey);

            var result = await Task.Run(() =>
            {
                tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = expireTime,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                string tokenResult = tokenHandler.WriteToken(token);
                return tokenResult;
            });

            return result;
        }
    }
}
