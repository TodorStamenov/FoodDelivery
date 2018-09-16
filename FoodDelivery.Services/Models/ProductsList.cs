using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Models
{
    public class ProductsList
    {
        private readonly IList<Guid> products;

        public ProductsList()
        {
            this.products = new List<Guid>();
        }

        public IEnumerable<Guid> Products
        {
            get { return this.products; }
        }

        public void AddProduct(Guid productId)
        {
            this.products.Add(productId);
        }

        public void RemoveProduct(Guid productId)
        {
            Guid productItemId = this.products
                .Where(i => i == productId)
                .FirstOrDefault();

            if (productItemId != Guid.Empty)
            {
                this.products.Remove(productItemId);
            }
        }

        public void ClearProducts()
        {
            this.products.Clear();
        }
    }
}