using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Services.Common;
using Assessment.CakeShop.Core.Services.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Services
{
    public class ToppingService : IToppingService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ToppingService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Topping>> GetToppingList()
        {
            var users = (await _unitOfWork.Topping.All()).ToList();
            return users;
        }

        public async Task<bool> SaveTopping(Topping topping)
        {
            topping.Id = Guid.NewGuid();
            var res = await _unitOfWork.Topping.Add(topping);
            await _unitOfWork.CompleteAsync();
            return res;
        }
    }
}
