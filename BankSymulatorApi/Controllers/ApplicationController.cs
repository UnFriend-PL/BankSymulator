using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IApplicationService _applicationervice;
        public ApplicationController(IAccountService accountService, UserManager<User> userManager, IApplicationService applicationervice)
        {
            _userManager = userManager;
            _accountService = accountService;
            _applicationervice = applicationervice;
        }

        [HttpPost("JointAccount")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ApplicationForJointAccountApplicationAsync([FromBody] JointAccountApplicationDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var result = await _applicationervice.CreateJointAccountApplicationAsync(user, model);
            if (result.Success)
            {
                result.Message = "Joint account application created successfully!";
                return Ok(result);
            }
            result.Message = "Joint account application creation failed.";
            return BadRequest(result);
        }

        [HttpGet("JointApplications/{status}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetJointAccountApplicationsAsync(string status)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var applications = await _applicationervice.GetJointAccountApplicationsByUserIdAsync(userId, status);
            return Ok(applications);
        }

        [HttpPatch("AcceptApplication/{applicationId}/{isAccepted}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AcceptApplicationAsync(string applicationId, bool isAccepted)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var result = await _applicationervice.AcceptApplicationAsync(applicationId, userId, isAccepted);
            if (result.Success)
            {
                result.Message = "Joint account application accepted successfully!";
                return Ok(result);
            }
            result.Message = "Joint account application acceptance failed.";
            return BadRequest(result);
        }
    }
}
