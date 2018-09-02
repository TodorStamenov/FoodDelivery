using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class ProductsOrders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public Guid OrderId { get; set; }

        public virtual Order Order { get; set; }

        public List<ProductsOrdersToppings> Toppings { get; set; } = new List<ProductsOrdersToppings>();
    }
}