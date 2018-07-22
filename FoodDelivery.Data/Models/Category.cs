using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MinLength(DataConstants.CategoryConstants.MinNameLength)]
        [MaxLength(DataConstants.CategoryConstants.MaxNameLength)]
        public string Name { get; set; }

        [MaxLength(DataConstants.CategoryConstants.MaxImageSize)]
        public byte[] Image { get; set; }

        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}