using FoodDelivery.Data;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Services.Models.BindingModels.Ingredients
{
    public class IngredientBindingModel
    {
        [Required]
        [StringLength(
            DataConstants.IngredientConstants.MaxNameLength,
            MinimumLength = DataConstants.IngredientConstants.MinNameLength)]
        public string Name { get; set; }

        [Required]
        public string IngredientType { get; set; }
    }
}