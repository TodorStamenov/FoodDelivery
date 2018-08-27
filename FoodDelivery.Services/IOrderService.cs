using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        void UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model);

        IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string username);

        IEnumerable<ListOrdersModeratorViewModel> History(int loadElements, int loadedElements);

        IEnumerable<ListOrdersModeratorViewModel> Queue(int loadElements, int loadedElements);
    }
}