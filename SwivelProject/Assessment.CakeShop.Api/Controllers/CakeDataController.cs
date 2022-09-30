using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Services.Common;
using Assessment.CakeShop.Core.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assessment.CakeShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CakeDataController : ControllerBase
    {
        private readonly ICakeShapeService cakeShapeService;
        private readonly IToppingService toppingService;

        public CakeDataController(ICakeShapeService cakeShapeService, IToppingService toppingService)
        {
            this.cakeShapeService = cakeShapeService;
            this.toppingService = toppingService;
        }

        [HttpGet]
        [Route("GetCakeShapes")]
        public async Task<IActionResult> GetCakeShapes()
        {
            var cakeShapes = await cakeShapeService.GetCakeShapeList();
            return Ok(cakeShapes);
        }

        [HttpPost]
        [Route("CreateCakeShape")]
        public async Task<IActionResult> CreateCakeShape(CakeShape cakeShape)
        {
            if (ModelState.IsValid)
            {
                var res = await cakeShapeService.SaveCakeShape(cakeShape);
                if (res)
                {
                    return Ok("Saved Successfully");
                }

            }

            return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
        }


        [HttpGet]
        [Route("GetToppings")]
        public async Task<IActionResult> GetToppings()
        {
            var toppings = await toppingService.GetToppingList();
            return Ok(toppings);
        }

        [HttpPost]
        [Route("CreateToppings")]
        public async Task<IActionResult> CreateToppings(Topping topping)
        {
            if (ModelState.IsValid)
            {
                var res = await toppingService.SaveTopping(topping);
                if (res)
                {
                    return Ok("Saved Successfully");
                }

            }

            return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
        }

    }
}
