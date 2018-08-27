using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Ingredients;
using FoodDelivery.Services.Models.ViewModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class OrderService : Service<Order>, IOrderService
    {
        public OrderService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model)
        {
            Dictionary<Guid, string> orderPairs = model
                .ToDictionary(
                    k => k.Id,
                    v => v.Status);

            List<Guid> orderIds = model
                .Select(o => o.Id)
                .ToList();

            IEnumerable<Order> orders = Database
                .Orders
                .Where(o => orderIds.Contains(o.Id))
                .ToList()
                .Where(o => o.Status.ToString() != orderPairs[o.Id]);

            foreach (var order in orders)
            {
                Enum.TryParse(orderPairs[order.Id], out Status newStatus);
                order.Status = newStatus;
            }

            Database.SaveChanges();
        }

        public IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string username)
        {
            IEnumerable<string> statuses = Enum
                .GetValues(typeof(Status))
                .Cast<Status>()
                .Select(s => s.ToString());

            return Database
                .Orders
                .Where(o => o.Executor.UserName == username)
                .Where(o => o.Status != Status.Delivered)
                .OrderBy(o => o.TimeStamp)
                .Select(o => new ListOrdersEmployeeViewModel
                {
                    Id = o.Id,
                    Address = o.Address,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    User = o.User.UserName,
                    Statuses = statuses,
                    Products = o.Products
                        .OrderBy(p => p.Product.Name)
                        .Select(p => new ListProductsWithIngredientsViewModel
                        {
                            Id = p.ProductId,
                            Name = p.Product.Name,
                            Mains = p.Product
                                .Ingredients
                                .OrderBy(i => i.Ingredient.Name)
                                .Where(i => i.Ingredient.IngredientType == IngredientType.Main)
                                .Select(i => new IngredientViewModel
                                {
                                    Id = i.IngredientId,
                                    Name = i.Ingredient.Name
                                }),
                            Toppings = p.Product
                                .Ingredients
                                .OrderBy(i => i.Ingredient.Name)
                                .Where(i => i.Ingredient.IngredientType == IngredientType.Topping)
                                .Select(i => new IngredientViewModel
                                {
                                    Id = i.IngredientId,
                                    Name = i.Ingredient.Name
                                })
                        })
                })
                .ToList();
        }

        public IEnumerable<ListOrdersModeratorViewModel> History(int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .OrderByDescending(o => o.TimeStamp)
                .Where(o => o.Status == Status.Delivered)
                .Skip(loadedElements)
                .Take(loadElements)
                .Select(o => new ListOrdersModeratorViewModel
                {
                    Id = o.Id,
                    Address = o.Address,
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    Executor = o.Executor.UserName,
                    User = o.User.UserName,
                    Products = o.Products
                        .OrderBy(p => p.Product.Name)
                        .Select(p => new ListProductsViewModel
                        {
                            Id = p.Product.Id,
                            Name = p.Product.Name,
                            Price = p.Product.Price
                        })
                })
                .ToList();
        }

        public IEnumerable<ListOrdersModeratorViewModel> Queue(int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .OrderBy(o => o.TimeStamp)
                .Where(o => o.Status != Status.Delivered)
                .Skip(loadedElements)
                .Take(loadElements)
                .Select(o => new ListOrdersModeratorViewModel
                {
                    Id = o.Id,
                    Address = o.Address,
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    Executor = o.Executor.UserName,
                    User = o.User.UserName,
                    Products = o.Products
                        .OrderBy(p => p.Product.Name)
                        .Select(p => new ListProductsViewModel
                        {
                            Id = p.Product.Id,
                            Name = p.Product.Name,
                            Price = p.Product.Price
                        })
                })
                .ToList();
        }
    }
}