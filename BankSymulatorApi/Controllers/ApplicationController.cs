using BankSymulatorApi.Models;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class MailController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        public MailController(IAccountService accountService, IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _accountService = accountService;
            _userService = userService;
            
        }
    }
}
