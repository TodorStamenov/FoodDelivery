using FoodDelivery.Common;
using FoodDelivery.Data.IdentityModels;
using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FoodDelivery.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<FoodDeliveryDbContext>
    {
        private const int AdminsCount = 1;
        private const int ModeratorsCount = 3;
        private const int EmployeesCount = 5;
        private const int UsersCount = 50;
        private const int CategoriesCount = 3;
        private const int ProductsCount = CategoriesCount * 10;
        private const int FeedbacksCount = ProductsCount * 3;
        private const int ToppingsCount = 20;
        private const int OrdersCount = 100;
        private const int MinPrice = 1;
        private const int MaxPrice = 10;
        private const int MinMass = 50;
        private const int MaxMass = 1000;
        private const int MinProductsPerOrder = 1;
        private const int MaxProductsPerOrder = 6;

        private static readonly Random random = new Random();

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = false;
        }

        protected override void Seed(FoodDeliveryDbContext context)
        {
            var roleStore = new RoleStore<Role, Guid, UserRole>(context);
            var roleManager = new RoleManager<Role, Guid>(roleStore);

            var userStore = new UserStore<User, Role, Guid, UserLogin, UserRole, UserClaim>(context);
            var userManager = new UserManager<User, Guid>(userStore)
            {
                PasswordValidator = new PasswordValidator()
                {
                    RequiredLength = 3,
                    RequireNonLetterOrDigit = false,
                    RequireDigit = false,
                    RequireLowercase = false,
                    RequireUppercase = false
                }
            };

            Task.Run(async () =>
            {
                await this.SeedRolesAsync(roleManager, context);
                await this.SeedUsersAsync(userManager, UsersCount, context);
                await this.SeedUsersAsync(userManager, roleManager, AdminsCount, CommonConstants.AdminRole, context);
                await this.SeedUsersAsync(userManager, roleManager, ModeratorsCount, CommonConstants.ModeratorRole, context);
                await this.SeedUsersAsync(userManager, roleManager, EmployeesCount, CommonConstants.EmployeeRole, context);
                await this.SeedCategoriesAsync(CategoriesCount, context);
                await this.SeedToppingsAsync(ToppingsCount, context);
                await this.SeedProductsAsync(ProductsCount, context);
                await this.SeedOrdersAsync(OrdersCount, context);
                await this.SeedProductsOrdersToppingsAsync(context);
                await this.SeedFeedbacksAsync(FeedbacksCount, context);
            })
            .GetAwaiter()
            .GetResult();
        }

        private async Task SeedRolesAsync(RoleManager<Role, Guid> roleManager, FoodDeliveryDbContext context)
        {
            if (await context.Roles.AnyAsync())
            {
                return;
            }

            await roleManager.CreateAsync(new Role { Id = Guid.NewGuid(), Name = CommonConstants.AdminRole });
            await roleManager.CreateAsync(new Role { Id = Guid.NewGuid(), Name = CommonConstants.ModeratorRole });
            await roleManager.CreateAsync(new Role { Id = Guid.NewGuid(), Name = CommonConstants.EmployeeRole });

            await context.SaveChangesAsync();
        }

        private async Task SeedUsersAsync(UserManager<User, Guid> userManager, int usersCount, FoodDeliveryDbContext context)
        {
            if (await context.Users.AnyAsync(u => !u.Roles.Any()))
            {
                return;
            }

            for (int i = 1; i <= usersCount; i++)
            {
                string email = $"user{i}@user.com";

                User user = new User
                {
                    Id = Guid.NewGuid(),
                    UserName = email,
                    Email = email
                };

                await userManager.CreateAsync(user, "123");
                await context.SaveChangesAsync();
            }
        }

        private async Task SeedUsersAsync(
            UserManager<User, Guid> userManager,
            RoleManager<Role, Guid> roleManager,
            int usersCount,
            string role,
            FoodDeliveryDbContext context)
        {
            if (await context.Users.AnyAsync(u => u.Roles.Any(r => r.Role.Name == role)))
            {
                return;
            }

            for (int i = 1; i <= usersCount; i++)
            {
                string email = $"{role}{i}@{role}.com";

                User user = new User
                {
                    Id = Guid.NewGuid(),
                    UserName = email,
                    Email = email,
                };

                await userManager.CreateAsync(user, "123");
                await userManager.AddToRoleAsync(user.Id, role);
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedCategoriesAsync(int categoriesCount, FoodDeliveryDbContext context)
        {
            if (await context.Categories.AnyAsync())
            {
                return;
            }

            for (int i = 1; i <= categoriesCount; i++)
            {
                context.Categories.Add(new Category
                {
                    Name = $"Category{i}",
                    Image = File.ReadAllBytes($"{this.GetCurrentDirectory()}/Files/CategoryImage{i}.jpg")
                });
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedToppingsAsync(int toppingsCount, FoodDeliveryDbContext context)
        {
            if (await context.Toppings.AnyAsync())
            {
                return;
            }

            for (int i = 1; i <= toppingsCount; i++)
            {
                context.Toppings.Add(new Topping
                {
                    Name = $"Topping{i}"
                });
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedProductsAsync(int productsCount, FoodDeliveryDbContext context)
        {
            if (await context.Products.AnyAsync())
            {
                return;
            }

            List<Guid> categoryIds = context
                .Categories
                .Select(c => c.Id)
                .ToList();

            List<Guid> toppingIds = context
                .Toppings
                .Select(t => t.Id)
                .ToList();

            for (int i = 1; i <= productsCount; i++)
            {
                Product product = new Product
                {
                    Name = $"Product{i}",
                    Mass = random.Next(MinMass, MaxMass),
                    Price = random.Next(MinPrice, MaxPrice),
                    CategoryId = categoryIds[random.Next(0, categoryIds.Count)]
                };

                int allowedToppingsCount = random.Next(0, 6);

                for (int j = 0; j < allowedToppingsCount; j++)
                {
                    Guid toppingId = toppingIds[random.Next(0, toppingIds.Count)];

                    if (product.Toppings.Any(t => t.ToppingId == toppingId))
                    {
                        j--;
                        continue;
                    }

                    product.Toppings.Add(new ProductsToppings
                    {
                        ToppingId = toppingId
                    });
                }

                context.Products.Add(product);
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedOrdersAsync(int ordersCount, FoodDeliveryDbContext context)
        {
            if (await context.Orders.AnyAsync())
            {
                return;
            }

            List<Product> products = context
                .Products
                .ToList();

            List<Guid> userIds = context
                .Users
                .Where(u => !u.Roles.Any(r => r.Role.Name == CommonConstants.EmployeeRole))
                .Select(u => u.Id)
                .ToList();

            List<Guid> employeeIds = context
                .Users
                .Where(u => u.Roles.Any(r => r.Role.Name == CommonConstants.EmployeeRole))
                .Select(e => e.Id)
                .ToList();

            List<Status> statuses = Enum.GetValues(typeof(Status)).Cast<Status>().ToList();

            for (int i = 1; i <= ordersCount; i++)
            {
                Order order = new Order
                {
                    Address = $"Delivery address number{i}",
                    Status = statuses[random.Next(0, statuses.Count)],
                    TimeStamp = DateTime.UtcNow.AddDays(i).AddHours(i),
                    UserId = userIds[random.Next(0, userIds.Count)],
                    ExecutorId = employeeIds[random.Next(0, employeeIds.Count)]
                };

                int productsCount = random.Next(MinProductsPerOrder, MaxProductsPerOrder);

                for (int j = 0; j < productsCount; j++)
                {
                    Product product = products[random.Next(0, products.Count)];

                    order.Products.Add(new ProductsOrders
                    {
                        ProductId = product.Id,
                        Product = product
                    });
                }

                order.Price = order
                    .Products
                    .Select(p => p.Product)
                    .Sum(p => p.Price);

                context.Orders.Add(order);
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedProductsOrdersToppingsAsync(FoodDeliveryDbContext context)
        {
            if (context.Toppings.SelectMany(t => t.Orders).Any())
            {
                return;
            }

            List<ProductsOrders> orders = context
                .Orders
                .SelectMany(o => o.Products)
                .ToList();

            foreach (var order in orders)
            {
                List<Guid> toppingIds = order
                    .Product
                    .Toppings
                    .Select(t => t.ToppingId)
                    .ToList();

                int toppingsForOrder = random.Next(0, toppingIds.Count);

                for (int i = 0; i < toppingsForOrder; i++)
                {
                    Guid toppingId = toppingIds[random.Next(0, toppingIds.Count)];

                    if (order.Toppings.Any(o => o.ToppingId == toppingId))
                    {
                        i--;
                        continue;
                    }

                    order.Toppings.Add(new ProductsOrdersToppings
                    {
                        ToppingId = toppingId
                    });
                }
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedFeedbacksAsync(int feedbacksCount, FoodDeliveryDbContext context)
        {
            if (await context.Feedbacks.AnyAsync())
            {
                return;
            }

            List<Guid> userIds = context
                .Users
                .Where(u => !u.Roles.Any(r => r.Role.Name == CommonConstants.EmployeeRole))
                .Select(u => u.Id)
                .ToList();

            List<Guid> productIds = context
                .Products
                .Select(p => p.Id)
                .ToList();

            List<Rate> rates = Enum.GetValues(typeof(Rate)).Cast<Rate>().ToList();

            string[] loremTokens = File.ReadAllText($"{this.GetCurrentDirectory()}/Files/Lorem.txt").Split();
            string lorem = string.Join(" ", loremTokens.Take(loremTokens.Length / 4));

            for (int i = 1; i <= feedbacksCount; i++)
            {
                context.Feedbacks.Add(new Feedback
                {
                    Content = lorem,
                    Rate = rates[random.Next(0, rates.Count)],
                    TimeStamp = DateTime.UtcNow.AddDays(i).AddHours(i),
                    ProductId = productIds[random.Next(0, productIds.Count)],
                    UserId = userIds[random.Next(0, userIds.Count)]
                });
            }

            await context.SaveChangesAsync();
        }

        private string GetCurrentDirectory()
        {
            return Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath);
        }
    }
}