using Assessment.CakeShop.Core.Models.Auth;
using Assessment.CakeShop.Core.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assessment.CakeShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IAuthService AuthService { get; }
        public AuthController(IAuthService AuthService)
        {
            this.AuthService = AuthService;
        }

        [HttpPost]
        [Route("Authorize")]
        public async Task<IActionResult> Authorize(ExternalLoginModel login)
        {
            return Ok(AuthService.GetToken(login));
        }
    }
}
