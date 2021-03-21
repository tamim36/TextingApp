using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataManager.Contracts;
using Microsoft.AspNetCore.Authorization;
using BSChat.Constants;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BSChat.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private IUserDataManager _userDataManager;
        
        public UserController(IUserDataManager userDataManager)
        {
            _userDataManager = userDataManager;
        }
        // GET: v1/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetUserList()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string userID = identity.FindFirst(BSConstants.UserId)?.Value;
            int id = Int32.Parse(userID);

            var result = await _userDataManager.GetUserList(id);

            return Ok(result);
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string userID = identity.FindFirst(BSConstants.UserId)?.Value;
            int id = Int32.Parse(userID);

            var result = await _userDataManager.GetUserById(id);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var result = await _userDataManager.GetUserById(id);

            return Ok(result);
        }
    }
}
