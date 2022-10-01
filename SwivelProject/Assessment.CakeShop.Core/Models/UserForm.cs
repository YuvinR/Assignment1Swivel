using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Models
{
    public class UserForm
    { 
         [Key]
         public Guid UserID { get; set; }
         public string UserName { get; set; }
         public byte[] PasswordHash { get; set; }
         public byte[] PasswordSalt { get; set; }
         public bool IsActive { get; set; }
         public int CreatedBy { get; set; }
         public DateTime CreatedDate { get; set; }
    }
}
