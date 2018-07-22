using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Product
    {
        public int Id { get; set; }

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

        [Required]
        [MaxLength(DataConstants.ProductConstants.MaxDescriptionLength)]
        public string Description { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual List<ProductsOrders> Orders { get; set; } = new List<ProductsOrders>();

        public virtual List<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        public virtual List<ProductsIngredients> Ingredients { get; set; } = new List<ProductsIngredients>();
    }
}