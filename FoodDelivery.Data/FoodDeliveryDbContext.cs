using FoodDelivery.Data.IdentityModels;
using FoodDelivery.Data.Migrations;
using FoodDelivery.Data.ModelConfigurations;
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

        public DbSet<UserRole> UserRoles { get; set; }

        public static FoodDeliveryDbContext Create()
        {
            return new FoodDeliveryDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Configurations.Add(new CategoryConfiguration());
            builder.Configurations.Add(new ProductConfiguration());
            builder.Configurations.Add(new UserConfiguration());
            builder.Configurations.Add(new UserRoleConfiguration());
            builder.Configurations.Add(new ProductsOrdersConfiguration());
            builder.Configurations.Add(new ProductsIngredientsConfiguration());
        }
    }
}