namespace AngularValidation.Models
{
    public class DataCaptureField
    {
        public string HelpText { get; set; }
        public bool IsVisible { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsRequired { get; set; }
        public string LabelText { get; set; }
        public FieldMask Mask { get; set; }
        public string Value { get; set; }
    }
}
