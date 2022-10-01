using Assessment.CakeShop.Core.Models.OrderModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assessment.CakeShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> CreateCakeShape([FromBody] CakeOrder cakeShape)
        {
            return new JsonResult("Order Placed SuccessFully") { StatusCode = 200 };
        }

    }
}
