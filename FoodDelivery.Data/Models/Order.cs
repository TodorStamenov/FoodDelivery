using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MinLength(DataConstants.OrderConstants.MinAddressLength)]
        [MaxLength(DataConstants.OrderConstants.MaxAddressLength)]
        public string Address { get; set; }

        [Range(
            DataConstants.OrderConstants.MinPrice,
            DataConstants.OrderConstants.MaxPrice)]
        public decimal Price { get; set; }

        public DateTime TimeStamp { get; set; }

        public Status Status { get; set; }

        public Guid UserId { get; set; }

        public virtual User User { get; set; }

        public Guid ExecutorId { get; set; }

        public virtual User Executor { get; set; }

        public virtual List<ProductsOrders> Products { get; set; } = new List<ProductsOrders>();
    }
}