using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        [Required]
        [MinLength(DataConstants.IngredientConstants.MinNameLength)]
        [MaxLength(DataConstants.IngredientConstants.MaxNameLength)]
        public string Name { get; set; }

        public IngredientType IngredientType { get; set; }

        public virtual List<ProductsIngredients> Products { get; set; } = new List<ProductsIngredients>();
    }
}