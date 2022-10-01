using Assessment.CakeShop.Core.Services;
using Assessment.CakeShop.Core.Services.Common;
using Assessment.CakeShop.EfCore;
using Assessment.DataAccess.EfCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Services
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly DBContext _context;
        private readonly ILogger _logger;

        public ICakeShapeRepository CakeShape { get; private set; }
        public IToppingRepository Topping { get; private set; }

        public IUserRepository UserForm { get; private set; }


        public UnitOfWork(DBContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("logs");

            CakeShape = new CakeShapeRepository(context, _logger);
            Topping = new ToppingRepository(context, _logger);
            UserForm = new UserRepository(context, _logger);
        }


        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
