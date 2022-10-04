using HealthCareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthCareAPI.Data
{
    public class FullStackDbContext:DbContext
    {
        public FullStackDbContext(DbContextOptions options): base(options)
        {

        }
        public DbSet<User>Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Orders> Order { get; set; }
    }
}
