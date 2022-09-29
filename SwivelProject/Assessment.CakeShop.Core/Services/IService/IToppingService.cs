using Assessment.CakeShop.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Services.IService
{
    public interface IToppingService
    {
        Task<List<Topping>> GetToppingList();
        Task<bool> SaveTopping(Topping topping);
    }
}
