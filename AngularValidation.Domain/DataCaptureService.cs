using AngularTest.Models;
using System.Collections.Generic;

namespace AngularTest.Domain
{
    public interface IDataCaptureService
    {
        List<FieldViewModel> RetrieveQuesitons();
    }

    public class DataCaptureService : IDataCaptureService
    {
        public List<FieldViewModel> RetrieveQuesitons()
        {
            return new List<FieldViewModel>() {
                new FieldViewModel()
                {
                    LabelText = "Spouse Name",
                    HelpText = "You must select a spouse",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Regex = FieldRegex.StringNonNumeric
                },
                new FieldViewModel()
                {
                    LabelText = "First Name",
                    HelpText = "You must enter a first name",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Regex = FieldRegex.StringNonNumeric
                },
                new FieldViewModel()
                {
                    LabelText = "Last Name",
                    HelpText = "You must enter a first name",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Regex = FieldRegex.StringNonNumeric
                },
                new FieldViewModel()
                {
                    LabelText = "SSN",
                    HelpText = "You must enter a Social Security Number",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Regex = FieldRegex.SSN
                },
                new FieldViewModel()
                {
                    LabelText = "Phone Number",
                    HelpText = "You must enter a phone number",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Regex = FieldRegex.PhoneNumber
                }
            };
        }
    }
}
