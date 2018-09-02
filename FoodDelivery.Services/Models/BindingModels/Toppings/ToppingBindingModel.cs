using FoodDelivery.Data;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Services.Models.BindingModels.Toppings
{
    public class ToppingBindingModel
    {
        [Required]
        [StringLength(
            DataConstants.ToppingConstants.MaxNameLength,
            MinimumLength = DataConstants.ToppingConstants.MinNameLength)]
        public string Name { get; set; }
    }
}