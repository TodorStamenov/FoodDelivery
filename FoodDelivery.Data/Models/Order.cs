using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(500)]
        public string Address { get; set; }

        [Range(double.Epsilon, double.MaxValue)]
        public decimal Price { get; set; }

        public Status Status { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public int ExecutorId { get; set; }

        public virtual User Executor { get; set; }

        public virtual List<ProductsOrders> Products { get; set; } = new List<ProductsOrders>();
    }
}