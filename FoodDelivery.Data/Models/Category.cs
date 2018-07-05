using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(1024 * 1024)]
        public byte[] Image { get; set; }

        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}