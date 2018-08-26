using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Ingredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MinLength(DataConstants.IngredientConstants.MinNameLength)]
        [MaxLength(DataConstants.IngredientConstants.MaxNameLength)]
        public string Name { get; set; }

        public IngredientType IngredientType { get; set; }

        public virtual List<ProductsIngredients> Products { get; set; } = new List<ProductsIngredients>();
    }
}