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
using System.Threading.Tasks;

namespace FoodDelivery.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<FoodDeliveryDbContext>
    {
        private const int AdminsCount = 1;
        private const int EmployeesCount = 5;
        private const int UsersCount = 50;
        private const int CategoriesCount = 3;
        private const int ProductsCount = CategoriesCount * 10;
        private const int FeedbacksCount = ProductsCount * 3;
        private const int IngredientsCount = ProductsCount * 6;
        private const int OrdersCount = 100;
        private const int MinPrice = 1;
        private const int MaxPrice = 10;
        private const int MinProductsPerOrder = 1;
        private const int MaxProductsPerOrder = 6;

        private static readonly Random random = new Random();

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(FoodDeliveryDbContext context)
        {
            var roleStore = new RoleStore<Role, int, UserRole>(context);
            var roleManager = new RoleManager<Role, int>(roleStore);

            var userStore = new UserStore<User, Role, int, UserLogin, UserRole, UserClaim>(context);
            var userManager = new UserManager<User, int>(userStore);

            userManager.PasswordValidator = new PasswordValidator()
            {
                RequiredLength = 3,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false
            };

            Task.Run(async () =>
            {
                await this.SeedRolesAsync(roleManager, context);
                await this.SeedUsersAsync(userManager, UsersCount, context);
                await this.SeedUsersAsync(userManager, roleManager, AdminsCount, CommonConstants.AdminRole, context);
                await this.SeedUsersAsync(userManager, roleManager, EmployeesCount, CommonConstants.EmployeeRole, context);
                await this.SeedCategoriesAsync(CategoriesCount, context);
                await this.SeedProductsAsync(ProductsCount, context);
                await this.SeedIngredientsAsync(IngredientsCount, context);
                await this.SeedOrdersAsync(OrdersCount, context);
                await this.SeedFeedbacksAsync(FeedbacksCount, context);
            })
            .GetAwaiter()
            .GetResult();
        }

        private async Task SeedRolesAsync(RoleManager<Role, int> roleManager, FoodDeliveryDbContext context)
        {
            if (await context.Roles.AnyAsync())
            {
                return;
            }

            await roleManager.CreateAsync(new Role { Name = CommonConstants.AdminRole });
            await roleManager.CreateAsync(new Role { Name = CommonConstants.EmployeeRole });

            await context.SaveChangesAsync();
        }

        private async Task SeedUsersAsync(UserManager<User, int> userManager, int usersCount, FoodDeliveryDbContext context)
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
                    UserName = email,
                    Email = email
                };

                await userManager.CreateAsync(user, "123");
                await context.SaveChangesAsync();
            }
        }

        private async Task SeedUsersAsync(
            UserManager<User, int> userManager,
            RoleManager<Role, int> roleManager,
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
                    Image = File.ReadAllBytes($"FoodDelivery.Data/Files/CategoryImage{i}.jpg")
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

            List<int> categoryIds = context.Categories
                .Select(c => c.Id)
                .ToList();

            for (int i = 1; i <= productsCount; i++)
            {
                context.Products.Add(new Product
                {
                    Name = $"Product{i}",
                    Description = $"Very very long and detailed product desctiption here {i}",
                    Mass = random.Next(50, 800),
                    Price = random.Next(MinPrice, MaxPrice),
                    CategoryId = categoryIds[random.Next(0, categoryIds.Count)]
                });
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedIngredientsAsync(int ingredientsCount, FoodDeliveryDbContext context)
        {
            if (await context.Ingredients.AnyAsync())
            {
                return;
            }

            List<int> productIds = context.Products
                .Select(p => p.Id)
                .ToList();

            for (int i = 1; i < ingredientsCount; i++)
            {
                Ingredient ingredient = new Ingredient
                {
                    Name = $"Ingredient{i}"
                };

                context.Ingredients.Add(ingredient);

                for (int j = 0; j < 5; j++)
                {
                    int productId = productIds[random.Next(0, productIds.Count)];

                    if (ingredient.Products.Any(p => p.ProductId == productId))
                    {
                        j--;
                        continue;
                    }

                    ingredient.Products.Add(new ProductsIngredients
                    {
                        ProductId = productId
                    });
                }
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedOrdersAsync(int ordersCount, FoodDeliveryDbContext context)
        {
            if (await context.Orders.AnyAsync())
            {
                return;
            }

            List<Product> products = context.Products.ToList();
            List<int> userIds = context.Users
                .Where(u => !u.Roles.Any(r => r.Role.Name == CommonConstants.EmployeeRole))
                .Select(u => u.Id)
                .ToList();

            List<int> employeeIds = context.Users
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
                    UserId = userIds[random.Next(0, userIds.Count)],
                    ExecutorId = employeeIds[random.Next(0, employeeIds.Count)]
                };

                int productsCount = random.Next(MinProductsPerOrder, MaxProductsPerOrder);

                for (int j = 0; j < productsCount; j++)
                {
                    Product product = products[random.Next(0, products.Count)];
                    int productId = product.Id;

                    if (order.Products.Any(p => p.ProductId == productId))
                    {
                        j--;
                        continue;
                    }

                    order.Products.Add(new ProductsOrders
                    {
                        ProductId = productId,
                        Product = product
                    });
                }

                order.Price = order.Products.Select(p => p.Product).Sum(p => p.Price);
                context.Orders.Add(order);
            }

            await context.SaveChangesAsync();
        }

        private async Task SeedFeedbacksAsync(int feedbacksCount, FoodDeliveryDbContext context)
        {
            if (await context.Feedbacks.AnyAsync())
            {
                return;
            }

            List<int> userIds = context.Users
                .Where(u => !u.Roles.Any(r => r.Role.Name == CommonConstants.EmployeeRole))
                .Select(u => u.Id)
                .ToList();

            List<int> productIds = context.Products
                .Select(p => p.Id)
                .ToList();

            List<Rate> rates = Enum.GetValues(typeof(Rate)).Cast<Rate>().ToList();

            string[] loremTokens = File.ReadAllText("FoodDelivery.Data/Files/Lorem.txt").Split();
            string lorem = string.Join(" ", loremTokens.Take(loremTokens.Length / 4));

            for (int i = 1; i <= feedbacksCount; i++)
            {
                context.Feedbacks.Add(new Feedback
                {
                    Content = lorem,
                    Rate = rates[random.Next(0, rates.Count)],
                    TimeStamp = DateTime.Now.AddDays(i).AddHours(i),
                    ProductId = productIds[random.Next(0, productIds.Count)],
                    UserId = userIds[random.Next(0, userIds.Count)]
                });
            }

            await context.SaveChangesAsync();
        }
    }
}