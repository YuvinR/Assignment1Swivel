using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Services;
using Assessment.DataAccess.EfCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.EfCore
{
    public class UserRepository : GenericRepository<UserForm>, IUserRepository
    {
        public UserRepository(DBContext context, ILogger logger) : base(context, logger)
        {
        }

    }
}
