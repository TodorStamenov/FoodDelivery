using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderService : IService
    {
        void Create(string address, string userId, IEnumerable<CreateOrderBindingModel> model);

        void UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model);

        OrderDetailsViewModel Details(Guid id);

        IEnumerable<ListOrdersUserViewModel> UserQueue(string userId);

        IEnumerable<ListOrdersUserViewModel> UserHistory(string userId, int loadElements, int loadedElements);

        IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue(string executorId);

        IEnumerable<ListOrdersModeratorViewModel> ModeratorQueue(int loadElements, int loadedElements);

        IEnumerable<ListOrdersModeratorViewModel> ModeratorHistory(int loadElements, int loadedElements);
    }
}