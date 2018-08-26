using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MinLength(DataConstants.CategoryConstants.MinNameLength)]
        [MaxLength(DataConstants.CategoryConstants.MaxNameLength)]
        public string Name { get; set; }

        [MaxLength(DataConstants.CategoryConstants.MaxImageSize)]
        public byte[] Image { get; set; }

        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}