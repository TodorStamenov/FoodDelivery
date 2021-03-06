﻿namespace FoodDelivery.Data
{
    public static class DataConstants
    {
        public static class CategoryConstants
        {
            public const int MinNameLength = 3;
            public const int MaxNameLength = 50;
            public const int MaxImageSize = 1024 * 1024;
        }

        public static class FeedbackConstants
        {
            public const int MaxContentLength = 5000;
        }

        public static class ToppingConstants
        {
            public const int MinNameLength = 3;
            public const int MaxNameLength = 50;
        }

        public static class OrderConstants
        {
            public const int MinAddressLength = 3;
            public const int MaxAddressLength = 500;
            public const double MinPrice = double.Epsilon;
            public const double MaxPrice = double.MaxValue;
        }

        public static class ProductConstants
        {
            public const int MinNameLength = 3;
            public const int MaxNameLength = 50;
            public const double MinPrice = double.Epsilon;
            public const double MaxPrice = double.MaxValue;
            public const int MinMass = 1;
            public const int MaxMass = int.MaxValue;
        }
    }
}