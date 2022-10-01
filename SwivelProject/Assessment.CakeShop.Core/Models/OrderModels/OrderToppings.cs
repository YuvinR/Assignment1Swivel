using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Models.OrderModels
{
    public class OrderToppings
    {
        public Guid ToppingID { get; set; }
        public string ToppingPrice { get; set; }
    }
}
