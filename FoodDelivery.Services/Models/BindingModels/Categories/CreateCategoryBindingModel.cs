using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Services.Models.BindingModels.Categories
{
    public class CreateCategoryBindingModel
    {
        [Required]
        [StringLength(3, MinimumLength = 50)]
        public string Name { get; set; }

        [MaxLength(1024 * 1024)]
        public byte[] Image { get; set; }
    }
}