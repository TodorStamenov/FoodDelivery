using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

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
            throw new NotImplementedException();
        }
    }
}