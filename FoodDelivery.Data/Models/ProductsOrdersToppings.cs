using System;

namespace FoodDelivery.Data.Models
{
    public class ProductsOrdersToppings
    {
        public Guid ProductOrderId { get; set; }

        public virtual ProductsOrders ProductOrder { get; set; }

        public Guid ToppingId { get; set; }

        public virtual Topping Topping { get; set; }
    }
}