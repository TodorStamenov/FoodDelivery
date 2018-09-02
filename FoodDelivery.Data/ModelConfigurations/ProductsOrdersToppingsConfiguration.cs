using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ProductsOrdersToppingsConfiguration : EntityTypeConfiguration<ProductsOrdersToppings>
    {
        public ProductsOrdersToppingsConfiguration()
        {
            this.HasKey(to => new { to.ProductOrderId, to.ToppingId });

            this.HasRequired(to => to.ProductOrder)
                .WithMany(po => po.Toppings)
                .HasForeignKey(to => to.ProductOrderId);

            this.HasRequired(po => po.Topping)
                .WithMany(t => t.Orders)
                .HasForeignKey(po => po.ToppingId);
        }
    }
}