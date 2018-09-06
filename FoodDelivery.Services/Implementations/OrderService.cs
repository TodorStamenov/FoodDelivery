using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Products;
using FoodDelivery.Services.Models.ViewModels.Toppings;
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
            Dictionary<Guid, string> orderPairs = model.ToDictionary(k => k.Id, v => v.Status);

            IEnumerable<Guid> orderIds = orderPairs.Keys.AsEnumerable();
            IEnumerable<Order> orders = Database.Orders.Where(o => orderIds.Contains(o.Id));

            foreach (var order in orders)
            {
                if (order.Status.ToString() == orderPairs[order.Id]
                    || !Enum.TryParse(orderPairs[order.Id], out Status newStatus))
                {
                    continue;
                }

                order.Status = newStatus;
            }

            Database.SaveChanges();
        }

        public IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string executorId)
        {
            IEnumerable<string> statuses = Enum
                .GetValues(typeof(Status))
                .Cast<Status>()
                .Select(s => s.ToString());

            return Database
                .Orders
                .Where(o => o.ExecutorId.ToString() == executorId)
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
                        .Select(p => new ListProductsWithToppingsViewModel
                        {
                            Id = p.ProductId,
                            Name = p.Product.Name,
                            Toppings = p.Toppings
                                .OrderBy(t => t.Topping.Name)
                                .Select(t => new ListToppingsViewModel
                                {
                                    Id = t.ToppingId,
                                    Name = t.Topping.Name
                                })
                        })
                })
                .ToList();
        }

        public IEnumerable<ListOrdersModeratorViewModel> ModeratorHistory(int loadElements, int loadedElements)
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

        public IEnumerable<ListOrdersModeratorViewModel> ModeratorQueue(int loadElements, int loadedElements)
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

        public IEnumerable<ListOrdersUserViewModel> UserOrder(string userId, int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .Where(o => o.UserId.ToString() == userId)
                .OrderByDescending(o => o.TimeStamp)
                .Skip(loadedElements)
                .Take(loadElements)
                .Select(o => new ListOrdersUserViewModel
                {
                    Id = o.Id,
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    ProductsCount = o.Products.Count,
                    Status = o.Status.ToString(),
                    Products = o.Products
                        .OrderBy(p => p.Product.Name)
                        .Select(p => new ListProductsViewModel
                        {
                            Id = p.Product.Id,
                            Name = p.Product.Name,
                            Mass = p.Product.Mass,
                            Price = p.Product.Price
                        })
                })
                .ToList();
        }
    }
}