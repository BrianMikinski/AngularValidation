using AngularValidation.Models;
using System.Collections.Generic;

namespace AngularValidation.Domain
{
    public class DataCaptureService : IDataCaptureService
    {
        private readonly FieldMask _threeNumbers,  _NorthAmericanPhone, _AlphaNumeric, _EnglishAlphabet, _SSN;
        private readonly List<FieldMask> _fieldMasks = new List<FieldMask>();

        public DataCaptureService()
        {
            _threeNumbers = new FieldMask()
            {
                AllowInvalidValue = false,
                Name = "Three Numbers",
                Regex = "9-9-9"
            };

            _NorthAmericanPhone = new FieldMask()
            {
                AllowInvalidValue = false,
                Name = "North American Phone Number",
                Regex = "(999)-999-9999"
            };

            _AlphaNumeric = new FieldMask()
            {
                AllowInvalidValue = false,
                Name = "Alpha Numeric",
                Regex = "[a-zA-Z0-9]"
            };

            _EnglishAlphabet = new FieldMask()
            {
                AllowInvalidValue = false,
                Name = "English Alphabet",
                Regex = "AAAAA"
            };

            _SSN = new FieldMask()
            {
                AllowInvalidValue = false,
                Name = "SSN",
                Regex = "999-99-9999"
            };

            _fieldMasks.Add(_threeNumbers);
            _fieldMasks.Add(_NorthAmericanPhone);
            _fieldMasks.Add(_AlphaNumeric);
            _fieldMasks.Add(_EnglishAlphabet);
            _fieldMasks.Add(_SSN);
        }

        public List<DataCaptureField> RetrieveQuesitons()
        {
            return new List<DataCaptureField>() {
                new DataCaptureField()
                {
                    LabelText = "Spouse Name",
                    HelpText = "You must select a spouse",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Mask = _EnglishAlphabet
                },
                new DataCaptureField()
                {
                    LabelText = "First Name",
                    HelpText = "You must enter a first name",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Mask = _EnglishAlphabet
                },
                new DataCaptureField()
                {
                    LabelText = "Last Name",
                    HelpText = "You must enter a first name",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Mask = _EnglishAlphabet
                },
                new DataCaptureField()
                {
                    LabelText = "SSN",
                    HelpText = "You must enter a Social Security Number",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Mask = _SSN
                },
                new DataCaptureField()
                {
                    LabelText = "Phone Number",
                    HelpText = "You must enter a phone number",
                    Value = "",
                    IsEnabled = false,
                    IsRequired = false,
                    Mask = _NorthAmericanPhone
                }
            };
        }

        public List<FieldMask> RetrieveMasks()
        {
            return _fieldMasks;
        }
    }
}
