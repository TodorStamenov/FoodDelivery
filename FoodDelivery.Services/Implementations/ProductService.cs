using FoodDelivery.Data;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services.Implementations
{
    public class ProductService : Service, IProductService
    {
        public ProductService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public IEnumerable<ListProductsViewModel> Products(int categoryId)
        {
            throw new NotImplementedException();
        }
    }
}