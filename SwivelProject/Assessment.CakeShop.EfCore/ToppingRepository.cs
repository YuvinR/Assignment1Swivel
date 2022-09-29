using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Services;
using Assessment.DataAccess.EfCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.EfCore
{
    public class ToppingRepository : GenericRepository<Topping>, IToppingRepository
    {
    
        public ToppingRepository(DBContext context, ILogger logger) : base(context, logger)
        {
        }

        public override async Task<IEnumerable<Topping>> All()
        {
            try
            {
                return await dbSet.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "{Repo} All function error", typeof(ToppingRepository));
                return new List<Topping>();
            }
        }
    }
}
