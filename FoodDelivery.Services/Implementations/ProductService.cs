using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Products;
using FoodDelivery.Services.Models.ViewModels.Products;
using FoodDelivery.Services.Models.ViewModels.Toppings;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class ProductService : Service, IProductService
    {
        public ProductService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public int GetTotalEntries()
        {
            return Database.Products.Count();
        }

        public int GetTotalEntries(Guid categoryId)
        {
            return Database
                .Products
                .Where(p => p.CategoryId == categoryId)
                .Count();
        }

        public void Create(string name, decimal price, int mass, Guid categoryId, IEnumerable<Guid> toppingIds)
        {
            if (HasProduct(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Product)));
            }

            if (!Database.Categories.Any(c => c.Id == categoryId))
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Category)));
            }

            Product product = new Product
            {
                Name = name,
                Price = price,
                Mass = mass,
                CategoryId = categoryId
            };

            product.Toppings = GetToppings(toppingIds);

            Database.Products.Add(product);
            Database.SaveChanges();
        }

        public void Edit(Guid id, string name, decimal price, int mass, Guid categoryId, IEnumerable<Guid> toppingIds)
        {
            Product product = Database
                .Products
                .Find(id);

            if (product == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            if (HasProduct(name) && name != product.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Product)));
            }

            if (!Database.Categories.Any(c => c.Id == categoryId))
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Category)));
            }

            product.Name = name;
            product.Price = price;
            product.Mass = mass;
            product.CategoryId = categoryId;

            for (int i = 0; i < product.Toppings.Count; i++)
            {
                Database.Entry(product.Toppings[i]).State = EntityState.Deleted;
            }

            Database.SaveChanges();

            product.Toppings = GetToppings(toppingIds);

            Database.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Product product = Database
                .Products
                .Find(id);

            if (product == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            Database.Products.Remove(product);
            Database.SaveChanges();
        }

        public ProductBindigModel GetProduct(Guid id)
        {
            ProductBindigModel model = Database
                .Products
                .Where(p => p.Id == id)
                .Select(p => new ProductBindigModel
                {
                    Name = p.Name,
                    Price = p.Price,
                    Mass = p.Mass,
                    CategoryId = p.CategoryId,
                    ToppingIds = p.Toppings.Select(t => t.ToppingId)
                })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            return model;
        }

        public IEnumerable<ListProductsModeratorViewModel> All(int page, int pageSize)
        {
            return Database
                .Products
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ListProductsModeratorViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Mass = p.Mass,
                    Price = p.Price,
                    Category = p.Category.Name,
                    Rating = !p.Feedbacks.Any()
                        ? "Not Evaluated"
                        : (Math.Round(p.Feedbacks
                            .Select(f => f.Rate)
                            .Cast<int>()
                            .Average(), 1) + 1)
                            .ToString() + "/5"
                })
                .ToList();
        }

        public IEnumerable<ListExtendedProductsWithToppingsViewModel> All(IEnumerable<Guid> productIds)
        {
            var productInfo = productIds
                .GroupBy(p => p)
                .ToDictionary(k => k.Key, v => v.Count());

            var products = Database
                .Products
                .Where(p => productIds.Contains(p.Id))
                .Select(p => new ListExtendedProductsWithToppingsViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Mass = p.Mass,
                    Toppings = p.Toppings
                        .Select(t => new ListToppingsViewModel
                        {
                            Id = t.ToppingId,
                            Name = t.Topping.Name
                        })
                })
                .ToList();

            foreach (var product in productInfo)
            {
                var productToAdd = products
                    .Where(p => p.Id == product.Key)
                    .FirstOrDefault();

                products.AddRange(Enumerable.Repeat(productToAdd, productInfo[product.Key] - 1));
            }

            return products.OrderBy(p => p.Name);
        }

        private List<ProductsToppings> GetToppings(IEnumerable<Guid> toppingIds)
        {
            return Database
                .Toppings
                .Where(t => toppingIds.Contains(t.Id))
                .Select(t => t.Id)
                .ToList()
                .Select(t => new ProductsToppings
                {
                    ToppingId = t
                })
                .ToList();
        }

        private bool HasProduct(string name)
        {
            return Database.Products.Any(c => c.Name == name);
        }
    }
}