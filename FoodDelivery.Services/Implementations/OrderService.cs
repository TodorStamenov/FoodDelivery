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
    public class OrderService : Service, IOrderService
    {
        public OrderService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public int GetTotalEntries()
        {
            return Database.Orders.Count();
        }

        public OrderDetailsViewModel Details(Guid id)
        {
            return Database
                .Orders
                .Where(o => o.Id == id)
                .Select(o => new OrderDetailsViewModel
                {
                    Id = o.Id,
                    Address = o.Address,
                    User = o.User.UserName,
                    Executor = o.Executor.UserName,
                    Price = o.Price,
                    Status = o.Status.ToString(),
                    TimeStamp = o.TimeStamp.ToString(),
                    ProductsCount = o.Products.Count,
                    Products = o.Products
                        .OrderBy(p => p.Product.Name)
                        .Select(p => new ListExtendedProductsWithToppingsViewModel
                        {
                            Id = p.Product.Id,
                            Name = p.Product.Name,
                            Price = p.Product.Price,
                            Mass = p.Product.Mass,
                            Toppings = p.Toppings
                                .Select(t => new ListToppingsViewModel
                                {
                                    Id = t.ToppingId,
                                    Name = t.Topping.Name
                                })
                        })
                })
                .FirstOrDefault();
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

        public IEnumerable<ListOrdersUserViewModel> UserQueue(string userId)
        {
            return Database
                .Orders
                .Where(o => o.UserId.ToString() == userId)
                .Where(o => o.Status != Status.Delivered)
                .OrderByDescending(o => o.TimeStamp)
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

        public IEnumerable<ListOrdersUserViewModel> UserHistory(string userId, int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .Where(o => o.UserId.ToString() == userId)
                .Where(o => o.Status == Status.Delivered)
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
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    User = o.User.UserName
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
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    User = o.User.UserName
                })
                .ToList();
        }
    }
}