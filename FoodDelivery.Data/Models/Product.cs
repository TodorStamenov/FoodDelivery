using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MinLength(DataConstants.ProductConstants.MinNameLength)]
        [MaxLength(DataConstants.ProductConstants.MaxNameLength)]
        public string Name { get; set; }

        [Range(
            DataConstants.ProductConstants.MinPrice,
            DataConstants.ProductConstants.MaxPrice)]
        public decimal Price { get; set; }

        [Range(
            DataConstants.ProductConstants.MinMass,
            DataConstants.ProductConstants.MaxMass)]
        public double Mass { get; set; }

        public Guid CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual List<ProductsOrders> Orders { get; set; } = new List<ProductsOrders>();

        public virtual List<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        public virtual List<ProductsIngredients> Ingredients { get; set; } = new List<ProductsIngredients>();
    }
}