namespace AngularValidation.Models
{
    public class FieldMask
    {
        public bool AllowInvalidValue { get; set; }
        public string Name { get; set; }
        public string Regex { get; set; }
    }
}