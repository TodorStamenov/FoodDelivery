using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        IEnumerable<ListOrdersViewModel> History();

        IEnumerable<ListOrdersViewModel> Queue();
    }
}