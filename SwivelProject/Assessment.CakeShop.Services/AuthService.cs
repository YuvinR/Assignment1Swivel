using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Models.Auth;
using Assessment.CakeShop.Core.Services.Common;
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
        private readonly IHashService hashService;

        private readonly IUnitOfWork unitOfWork;
        public AuthService(IHashService hashService, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            this.hashService = hashService;
            Configuration = configuration;
            this.unitOfWork = unitOfWork;
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
                Expires = DateTime.UtcNow.AddMinutes(50),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<UserForm> GetUserByUserName(string userName)
        {
            var users  = (await unitOfWork.UserForm.Find(x=>x.UserName == userName)).ToList();

            return users[0];

        }

        public async Task<bool> Register(UserRegModel regModel)
        {
            // var user = GetUserByUserName(login.UserName);
            //return "sd";
            var passwordHashSalt = hashService.CreatePasswordHash(regModel.Password);

            UserForm userRegModel = new UserForm
            {
                UserID = Guid.NewGuid(),
                UserName = regModel.UserName,
                IsActive = true,
                PasswordSalt = passwordHashSalt.passwordSalt,
                PasswordHash = passwordHashSalt.passwordHash,
                CreatedBy = 1,
                CreatedDate = new DateTime()
            };

            var res = await unitOfWork.UserForm.Add(userRegModel);
            await unitOfWork.CompleteAsync();
            return res;
        }
    }
}
