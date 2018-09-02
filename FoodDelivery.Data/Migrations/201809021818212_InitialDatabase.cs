namespace FoodDelivery.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class InitialDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Name = c.String(nullable: false, maxLength: 50),
                    Image = c.Binary(),
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);

            CreateTable(
                "dbo.Products",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Name = c.String(nullable: false, maxLength: 50),
                    Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    Mass = c.Int(nullable: false),
                    CategoryId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.Name, unique: true)
                .Index(t => t.CategoryId);

            CreateTable(
                "dbo.Feedbacks",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Content = c.String(),
                    Rate = c.Int(nullable: false),
                    TimeStamp = c.DateTime(nullable: false),
                    ProductId = c.Guid(nullable: false),
                    UserId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.Users",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    Email = c.String(),
                    EmailConfirmed = c.Boolean(nullable: false),
                    PasswordHash = c.String(),
                    SecurityStamp = c.String(),
                    PhoneNumber = c.String(),
                    PhoneNumberConfirmed = c.Boolean(nullable: false),
                    TwoFactorEnabled = c.Boolean(nullable: false),
                    LockoutEndDateUtc = c.DateTime(),
                    LockoutEnabled = c.Boolean(nullable: false),
                    AccessFailedCount = c.Int(nullable: false),
                    UserName = c.String(),
                })
                .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    UserId = c.Guid(nullable: false),
                    ClaimType = c.String(),
                    ClaimValue = c.String(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                {
                    LoginProvider = c.String(nullable: false, maxLength: 128),
                    ProviderKey = c.String(nullable: false, maxLength: 128),
                    UserId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.Orders",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Address = c.String(nullable: false, maxLength: 500),
                    Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    TimeStamp = c.DateTime(nullable: false),
                    Status = c.Int(nullable: false),
                    UserId = c.Guid(nullable: false),
                    ExecutorId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .ForeignKey("dbo.Users", t => t.ExecutorId)
                .Index(t => t.UserId)
                .Index(t => t.ExecutorId);

            CreateTable(
                "dbo.ProductsOrders",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    ProductId = c.Guid(nullable: false),
                    OrderId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.OrderId);

            CreateTable(
                "dbo.ProductsOrdersToppings",
                c => new
                {
                    ProductOrderId = c.Guid(nullable: false),
                    ToppingId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => new { t.ProductOrderId, t.ToppingId })
                .ForeignKey("dbo.ProductsOrders", t => t.ProductOrderId, cascadeDelete: true)
                .ForeignKey("dbo.Toppings", t => t.ToppingId, cascadeDelete: true)
                .Index(t => t.ProductOrderId)
                .Index(t => t.ToppingId);

            CreateTable(
                "dbo.Toppings",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Name = c.String(nullable: false, maxLength: 50),
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);

            CreateTable(
                "dbo.UserRoles",
                c => new
                {
                    UserId = c.Guid(nullable: false),
                    RoleId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);

            CreateTable(
                "dbo.AspNetRoles",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    Name = c.String(nullable: false, maxLength: 256),
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
        }

        public override void Down()
        {
            DropForeignKey("dbo.Products", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Feedbacks", "ProductId", "dbo.Products");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Orders", "ExecutorId", "dbo.Users");
            DropForeignKey("dbo.Orders", "UserId", "dbo.Users");
            DropForeignKey("dbo.ProductsOrdersToppings", "ToppingId", "dbo.Toppings");
            DropForeignKey("dbo.ProductsOrdersToppings", "ProductOrderId", "dbo.ProductsOrders");
            DropForeignKey("dbo.ProductsOrders", "ProductId", "dbo.Products");
            DropForeignKey("dbo.ProductsOrders", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.Feedbacks", "UserId", "dbo.Users");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.Users");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.Toppings", new[] { "Name" });
            DropIndex("dbo.ProductsOrdersToppings", new[] { "ToppingId" });
            DropIndex("dbo.ProductsOrdersToppings", new[] { "ProductOrderId" });
            DropIndex("dbo.ProductsOrders", new[] { "OrderId" });
            DropIndex("dbo.ProductsOrders", new[] { "ProductId" });
            DropIndex("dbo.Orders", new[] { "ExecutorId" });
            DropIndex("dbo.Orders", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.Feedbacks", new[] { "UserId" });
            DropIndex("dbo.Feedbacks", new[] { "ProductId" });
            DropIndex("dbo.Products", new[] { "CategoryId" });
            DropIndex("dbo.Products", new[] { "Name" });
            DropIndex("dbo.Categories", new[] { "Name" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Toppings");
            DropTable("dbo.ProductsOrdersToppings");
            DropTable("dbo.ProductsOrders");
            DropTable("dbo.Orders");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.Feedbacks");
            DropTable("dbo.Products");
            DropTable("dbo.Categories");
        }
    }
}