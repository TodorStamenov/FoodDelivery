using System;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.BindingModels.Orders
{
    public class CreateOrderBindingModel
    {
        public Guid Id { get; set; }

        public IEnumerable<Guid> ToppingIds { get; set; }
    }
}