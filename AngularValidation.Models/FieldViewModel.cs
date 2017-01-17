namespace AngularTest.Models
{
    public class FieldViewModel
    {
        public string LabelText { get; set; }
        public string HelpText { get; set; }
        public string Value { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsRequired { get; set; }
        public FieldRegex Regex { get; set; }
    }
}
