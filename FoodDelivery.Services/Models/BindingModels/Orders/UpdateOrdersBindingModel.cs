using System;

namespace FoodDelivery.Services.Models.BindingModels.Orders
{
    public class UpdateOrdersBindingModel
    {
        public Guid Id { get; set; }

        public string Status { get; set; }
    }
}