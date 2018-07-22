using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        [MinLength(DataConstants.OrderConstants.MinAddressLength)]
        [MaxLength(DataConstants.OrderConstants.MaxAddressLength)]
        public string Address { get; set; }

        [Range(
            DataConstants.OrderConstants.MinPrice,
            DataConstants.OrderConstants.MaxPrice)]
        public decimal Price { get; set; }

        public Status Status { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public int ExecutorId { get; set; }

        public virtual User Executor { get; set; }

        public virtual List<ProductsOrders> Products { get; set; } = new List<ProductsOrders>();
    }
}