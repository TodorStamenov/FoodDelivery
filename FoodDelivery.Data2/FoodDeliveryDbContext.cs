using FoodDelivery.Data.IdentityModels;
using FoodDelivery.Data.Migrations;
using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace FoodDelivery.Data
{
    public class FoodDeliveryDbContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public FoodDeliveryDbContext()
            : base("data source=.;initial catalog=FoodDelivery;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<FoodDeliveryDbContext, Configuration>());
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }

        public static FoodDeliveryDbContext Create()
        {
            return new FoodDeliveryDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder
                .Entity<Category>()
                .HasMany(c => c.Products)
                .WithRequired(p => p.Category)
                .HasForeignKey(p => p.CategoryId);

            builder
                .Entity<Product>()
                .HasMany(p => p.Feedbacks)
                .WithRequired(f => f.Product)
                .HasForeignKey(f => f.ProductId);

            builder
                 .Entity<User>()
                 .HasMany(u => u.Feedbacks)
                 .WithRequired(f => f.User)
                 .HasForeignKey(f => f.UserId)
                 .WillCascadeOnDelete(false);

            builder
                .Entity<User>()
                .HasMany(u => u.Orders)
                .WithRequired(o => o.User)
                .HasForeignKey(o => o.UserId)
                .WillCascadeOnDelete(false);

            builder
                .Entity<User>()
                .HasMany(u => u.ReceivedOrders)
                .WithRequired(o => o.Executor)
                .HasForeignKey(o => o.ExecutorId)
                .WillCascadeOnDelete(false);

            builder
                .Entity<ProductsOrders>()
                .HasRequired(po => po.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(po => po.ProductId);

            builder
                .Entity<ProductsOrders>()
                .HasRequired(po => po.Order)
                .WithMany(p => p.Products)
                .HasForeignKey(po => po.OrderId);

            builder
                .Entity<ProductsIngredients>()
                .HasKey(pi => new { pi.ProductId, pi.IngredientId });

            builder
                .Entity<ProductsOrders>()
                .HasKey(po => new { po.ProductId, po.OrderId });

            builder
                .Entity<ProductsIngredients>()
                .HasRequired(pi => pi.Product)
                .WithMany(p => p.Ingredients)
                .HasForeignKey(pi => pi.ProductId);

            builder
                .Entity<ProductsIngredients>()
                .HasRequired(pi => pi.Ingredient)
                .WithMany(p => p.Products)
                .HasForeignKey(pi => pi.IngredientId);
        }
    }
}