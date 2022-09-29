using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Assessment.CakeShop.EFCore
{
    public class EfCoreDbContext : DbContext
    {
        public EfCoreDbContext(DbContextOptions<EfCoreDbContext> options) : base(options)
        {

        }
        public DbSet<Object> Data { get; set; }
    }
}