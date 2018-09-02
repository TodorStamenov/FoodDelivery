using FoodDelivery.Services.Models.BindingModels.Toppings;
using FoodDelivery.Services.Models.ViewModels.Toppings;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IToppingService : IService
    {
        void Create(string name);

        void Edit(Guid id, string name);

        void Delete(Guid id);

        ToppingBindingModel GetTopping(Guid id);

        IEnumerable<ListToppingsViewModel> All();
    }
}