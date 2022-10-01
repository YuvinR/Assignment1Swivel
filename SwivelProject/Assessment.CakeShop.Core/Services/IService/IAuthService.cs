using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Models.Auth;

namespace Assessment.CakeShop.Core.Services.IService
{
    public interface IAuthService
    {
        public string GetToken(ExternalLoginModel login);
        public Task<bool> Register(UserRegModel login);
    }
} 
