using Assessment.CakeShop.Core.Models.Auth;
using Assessment.CakeShop.Core.Services.IService;
using Assessment.CakeShop.Services;
using Moq;

namespace Assessment.CakeShop.UnitTest
{
    public class UnitTest1
    {
        private readonly Mock<IAuthService> authService = null;


        public UnitTest1(IAuthService authService)
        {
            this.authService = new Mock<IAuthService>();
        }

        [Fact]
        public void TestAuthToken()
        {

            ExternalLoginModel loginModel = new ExternalLoginModel {
                UserName = "XPL",
                Password = "XPL"
               
            };
            string res = "";
            authService.Setup(x=>x.GetToken(loginModel)).Returns(res);
            Assert.IsType<ExternalLoginModel>(res);
            Assert.Empty(loginModel.UserName);
        }
    }
}