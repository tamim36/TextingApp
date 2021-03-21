using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Models.DTO;
using TokenService.Contracts;
using TokenService;
using DataManager.Contracts;
using System.Security.Claims;
using BSChat.Constants;

namespace BSChat.Commands
{
    public class SignInHandler : IRequestHandler<SignInModel, TokenModel>
    {
        private IJwtSecrets _jwtSecrets;
        private IAuthDataManager _authDataManager;
        private ITokenGenerator _tokenGenerator;

        public SignInHandler(IJwtSecrets jwtSecrets, IAuthDataManager authDataManager, ITokenGenerator tokenGenerator)
        {
            _jwtSecrets = jwtSecrets;
            _authDataManager = authDataManager;
            _tokenGenerator = tokenGenerator;
        }
        public async Task<TokenModel> Handle(SignInModel request, CancellationToken cancellationToken)
        {
            var result = await _authDataManager.SignIn(request.Mail);
            if (result == null) return null;

            var claims = new Claim[]
            {
                new Claim(BSConstants.UserId,result.Id.ToString())
            };
            string jwt = await _tokenGenerator.GenerateJwtToken(claims, _jwtSecrets.TokenSecrete, DateTime.Now.AddDays(1));
            var token = new TokenModel
            {
                Token = jwt
            };
            return token;
        }
    }
}
