using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        IEnumerable<ListOrdersViewModel> History(int loadElements, int loadedElements);

        IEnumerable<ListOrdersViewModel> Queue(int loadElements, int loadedElements);
    }
}