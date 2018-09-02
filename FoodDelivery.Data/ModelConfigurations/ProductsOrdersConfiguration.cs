using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ProductsOrdersConfiguration : EntityTypeConfiguration<ProductsOrders>
    {
        public ProductsOrdersConfiguration()
        {
            this.HasRequired(po => po.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(po => po.ProductId);

            this.HasRequired(po => po.Order)
                .WithMany(p => p.Products)
                .HasForeignKey(po => po.OrderId);
        }
    }
}