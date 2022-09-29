using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Models
{
    public class CakeShape
    {
        public Guid Id { get; set; }
        public string ShapeName { get; set; }
        public string ShapePrice { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
