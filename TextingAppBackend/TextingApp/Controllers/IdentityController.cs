using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.DTO;
using MediatR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BSChat.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private IMediator _mediatR;

        public IdentityController(IMediator mediator)
        {
            _mediatR = mediator;
        }

        // POST api/<IdentityController>
        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SignInModel signInModel)
        {
            var result = await _mediatR.Send(signInModel);

            //if(result == null)
            //{
            //    return BadRequest("Incorect credential");
            //}

            return Ok(result);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] PersonDto personDto)
        {
            var result = await _mediatR.Send(personDto);
            return Ok(result);
        }
    }
}
