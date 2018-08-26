using System;

namespace FoodDelivery.Data.Models
{
    public class ProductsOrders
    {
        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public Guid OrderId { get; set; }

        public virtual Order Order { get; set; }
    }
}