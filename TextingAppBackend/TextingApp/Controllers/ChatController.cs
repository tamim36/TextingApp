using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Models.DTO;
using Models.Entities;
using BSChat.Constants;
using System.Security.Claims;
using MediatR;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BSChat.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private IMediator _mediator;
        public ChatController( IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("text")]
        public async Task<IActionResult> SendMessageToExisting([FromBody] MessageGroup textMessage)
        {

            var result = await _mediator.Send(textMessage);

            return Ok(result);
        }

        [HttpPost("deleteSingle")]
        public async Task DeleteGroup(DeleteSingleMessage deleteSingleMessageGroup)
        {
            await _mediator.Send(deleteSingleMessageGroup);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateMessageGroup createMessageGroup)
        {
            var group = await _mediator.Send(createMessageGroup);
            if (group == null)
            {
                return BadRequest("GROUP_EXIST");
            }
            return Ok(group);
        }

        [HttpGet("old")]
        public async Task<IActionResult> GetOldMessages()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string userID = identity.FindFirst(BSConstants.UserId)?.Value;            
            var messageId = new GetMessage
            {
                Id = Int32.Parse(userID)
            };

            var result = await _mediator.Send(messageId);

            return Ok(result);
        }

        [HttpGet("group/{friendId}")]
        public async Task<IActionResult> GetGroup(int friendId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string userID = identity.FindFirst(BSConstants.UserId)?.Value;

            var getMessageGroupById = new GetMessageGroupById
            {
                friendId = friendId,
                myId = Int32.Parse(userID)
            };

            var result = await _mediator.Send(getMessageGroupById);

            return Ok(result);
        }

        [HttpPost("delete")]
        public async Task DeleteGroup(DeleteMessageGroup deleteMessageGroup)
        {
            await _mediator.Send(deleteMessageGroup);
        }
    }
}
