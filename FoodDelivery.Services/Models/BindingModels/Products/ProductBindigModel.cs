using FoodDelivery.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Services.Models.BindingModels.Products
{
    public class ProductBindigModel
    {
        [Required]
        [StringLength(
            DataConstants.ProductConstants.MaxNameLength,
            MinimumLength = DataConstants.ProductConstants.MinNameLength)]
        public string Name { get; set; }

        [Range(
            DataConstants.ProductConstants.MinPrice,
            DataConstants.ProductConstants.MaxPrice)]
        public decimal Price { get; set; }

        [Range(
            DataConstants.ProductConstants.MinMass,
            DataConstants.ProductConstants.MaxMass)]
        public int Mass { get; set; }

        public Guid CategoryId { get; set; }
    }
}