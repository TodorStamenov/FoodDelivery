using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        OrderDetailsViewModel Details(Guid id);

        void UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model);

        IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string executorId);

        IEnumerable<ListOrdersModeratorViewModel> ModeratorHistory(int loadElements, int loadedElements);

        IEnumerable<ListOrdersModeratorViewModel> ModeratorQueue(int loadElements, int loadedElements);

        IEnumerable<ListOrdersUserViewModel> UserOrder(string userId, int loadElements, int loadedElements);
    }
}