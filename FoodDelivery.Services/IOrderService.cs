using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string username);

        IEnumerable<ListOrdersModeratorViewModel> History(int loadElements, int loadedElements);

        IEnumerable<ListOrdersModeratorViewModel> Queue(int loadElements, int loadedElements);
    }
}