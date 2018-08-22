using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.ViewModels.Orders;
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

        public IEnumerable<ListOrdersViewModel> History(int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .OrderByDescending(o => o.TimeStamp)
                .Where(o => o.Status == Status.Delivered)
                .Skip(loadedElements)
                .Take(loadElements)
                .Select(o => new ListOrdersViewModel
                {
                    Id = o.Id,
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    Executor = o.Executor.UserName,
                    User = o.User.UserName
                })
                .ToList();
        }

        public IEnumerable<ListOrdersViewModel> Queue(int loadElements, int loadedElements)
        {
            return Database
                .Orders
                .OrderBy(o => o.TimeStamp)
                .Where(o => o.Status != Status.Delivered)
                .Skip(loadedElements)
                .Take(loadElements)
                .Select(o => new ListOrdersViewModel
                {
                    Id = o.Id,
                    Price = o.Price,
                    TimeStamp = o.TimeStamp.ToString(),
                    Status = o.Status.ToString(),
                    ProductsCount = o.Products.Count,
                    Executor = o.Executor.UserName,
                    User = o.User.UserName
                })
                .ToList();
        }
    }
}