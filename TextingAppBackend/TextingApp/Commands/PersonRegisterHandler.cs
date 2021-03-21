using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Models.DTO;
using Models.Entities;
using DataManager.Contracts;
using AutoMapper;

namespace BSChat.Commands
{
    public class PersonRegisterHandler : IRequestHandler<PersonDto, PersonDto>
    {
        private IAuthDataManager _authDataManager;
        private IMapper _mapper;

        public PersonRegisterHandler(IAuthDataManager authDataManager, IMapper mapper)
        {
            _authDataManager = authDataManager;
            _mapper = mapper;
        }
        public async Task<PersonDto> Handle(PersonDto request, CancellationToken cancellationToken)
        {
           var person = _mapper.Map<Person>(request);
           bool isSuccess = await _authDataManager.SignUp(person);

            if (!isSuccess)
            {
                request.isSuccess = false;
            }
           
           return request;
        }
    }
}
