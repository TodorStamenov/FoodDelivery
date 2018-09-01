using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class ProductService : Service<Product>, IProductService
    {
        public ProductService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public IEnumerable<ListProductsViewModel> All(Guid categoryId)
        {
            return Database
                .Products
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new ListProductsViewModel
                {
                })
                .ToList();
        }
    }
}