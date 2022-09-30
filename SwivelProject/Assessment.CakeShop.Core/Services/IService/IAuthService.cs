using Assessment.CakeShop.Core.Models.Auth;

namespace Assessment.CakeShop.Core.Services.IService
{
    public interface IAuthService
    {
        public string GetToken(ExternalLoginModel login);
       
    }
}
