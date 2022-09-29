using Assessment.CakeShop.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Assessment.DataAccess.EfCore
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Topping> Toppings { get; set; }
        public virtual DbSet<CakeShape> CakeShapes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}