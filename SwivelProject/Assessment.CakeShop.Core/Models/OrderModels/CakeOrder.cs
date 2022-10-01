using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Models.OrderModels
{
    public class CakeOrder
    {
        public Guid ShapeID { get; set; }
        public float Size { get; set; }
        public string Message { get; set; }
        public float TotalPrice { get; set; }
        public List<OrderToppings> OrderToppings { get; set; }
    }
}
