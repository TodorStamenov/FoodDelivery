using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; }

        [Range(double.Epsilon, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(double.Epsilon, double.MaxValue)]
        public double Mass { get; set; }

        [Required]
        [MaxLength(5000)]
        public string Description { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual List<ProductsOrders> Orders { get; set; } = new List<ProductsOrders>();

        public virtual List<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        public virtual List<ProductsIngredients> Ingredients { get; set; } = new List<ProductsIngredients>();
    }
}