using FoodDelivery.Data;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace FoodDelivery.Services.Models.BindingModels.Categories
{
    public class CategoryBindingModel
    {
        [Required]
        [StringLength(
            DataConstants.CategoryConstants.MaxNameLength,
            MinimumLength = DataConstants.CategoryConstants.MinNameLength)]
        public string Name { get; set; }

        [Required]
        public HttpPostedFileBase Image { get; set; }
    }
}