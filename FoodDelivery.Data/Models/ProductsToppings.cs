using System;

namespace FoodDelivery.Data.Models
{
    public class ProductsToppings
    {
        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public Guid ToppingId { get; set; }

        public virtual Topping Topping { get; set; }
    }
}