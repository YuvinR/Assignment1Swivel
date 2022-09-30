using Assessment.CakeShop.Core.Models.Auth;
using Assessment.CakeShop.Core.Services.IService;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Assessment.CakeShop.Services
{
    public class AuthService : IAuthService
    {
        public IConfiguration Configuration { get; }
        public AuthService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string GetToken(ExternalLoginModel login)
        {
            var UserName = Configuration["ExternalClients:User:UserName"];
            var Password = Configuration["ExternalClients:User:Password"];

            if (UserName == login.UserName && Password == login.Password)
            {
                return GenerateJwtToken(UserName);
            }

            return string.Empty;


        }

        private string GenerateJwtToken(string userName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("KeyoftheexternalAPI");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
