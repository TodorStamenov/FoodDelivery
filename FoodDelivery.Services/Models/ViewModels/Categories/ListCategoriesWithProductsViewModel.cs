using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Categories
{
    public class ListCategoriesWithProductsViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public IEnumerable<ListProductsViewModel> Products { get; set; }
    }
}