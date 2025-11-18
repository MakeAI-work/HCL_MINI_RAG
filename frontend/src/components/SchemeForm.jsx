import React, { useState } from 'react';

const defaultState = {
  Objective: '',
  Demographics: {
    Age: '',
    Salary: '',
    Gender: '',
    Occupation: '',
    Category: '',
    Location: '',
    Disabled: '',
    CriminalRecords: '',
    Education: '',
    Married: '',
    NoOfChildren: '',
    NoOfSiblings: '',
    SingleParent: '',
    DependentFamilyMembers: ''
  },
  SpecificRequirements: {
    Description: '',
    TypeOfBenefit: ''
  },
  AdditionalInformation: {
    PreviousBeneficiaryStatus: ''
  }
};

export default function SchemeForm({ onResults }) {
  const [formData, setFormData] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  function handleChange(e, path = []) {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      let target = updated;
      path.forEach(key => target = target[key]);
      target[name] = value;
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/get_schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      onResults(data);
    } catch (err) {
      console.error(err);
      onResults({ error: 'Failed to fetch schemes' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Objective */}
      <div>
        <label className="block font-medium">Objective</label>
        <input
          type="text"
          name="Objective"
          value={formData.Objective}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      {/* Demographics */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Demographics</legend>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* Age */}
          <div>
            <label>Age</label>
            <input type="number" name="Age" value={formData.Demographics.Age} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Salary */}
          <div>
            <label>Salary</label>
            <input type="number" name="Salary" value={formData.Demographics.Salary} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Gender */}
          <div>
            <label>Gender</label>
            <select name="Gender" value={formData.Demographics.Gender} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Occupation */}
          <div>
            <label>Occupation</label>
            <input type="text" name="Occupation" value={formData.Demographics.Occupation} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Category */}
          <div>
            <label>Category</label>
            <input type="text" name="Category" value={formData.Demographics.Category} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Location */}
          <div>
            <label>Location</label>
            <input type="text" name="Location" value={formData.Demographics.Location} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Disabled */}
          <div>
            <label>Disabled</label>
            <select name="Disabled" value={formData.Demographics.Disabled} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* Criminal Records */}
          <div>
            <label>Criminal Records</label>
            <select name="CriminalRecords" value={formData.Demographics.CriminalRecords} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* Education */}
          <div>
            <label>Education</label>
            <input type="text" name="Education" value={formData.Demographics.Education} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Married */}
          <div>
            <label>Married</label>
            <select name="Married" value={formData.Demographics.Married} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* Children */}
          <div>
            <label>No of Children</label>
            <input type="number" name="NoOfChildren" value={formData.Demographics.NoOfChildren} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Siblings */}
          <div>
            <label>No of Siblings</label>
            <input type="number" name="NoOfSiblings" value={formData.Demographics.NoOfSiblings} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
          {/* Single Parent */}
          <div>
            <label>Single Parent</label>
            <select name="SingleParent" value={formData.Demographics.SingleParent} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* Dependent Members */}
          <div>
            <label>Dependent Family Members</label>
            <input type="number" name="DependentFamilyMembers" value={formData.Demographics.DependentFamilyMembers} onChange={(e)=>handleChange(e,['Demographics'])} className="border p-2 w-full"/>
          </div>
        </div>
      </fieldset>

      {/* Specific Requirements */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Specific Requirements</legend>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="col-span-2">
            <label>Description</label>
            <textarea name="Description" value={formData.SpecificRequirements.Description} onChange={(e)=>handleChange(e,['SpecificRequirements'])} className="border p-2 w-full" rows="3"/>
          </div>
          <div>
            <label>Type of Benefit</label>
            <input type="text" name="TypeOfBenefit" value={formData.SpecificRequirements.TypeOfBenefit} onChange={(e)=>handleChange(e,['SpecificRequirements'])} className="border p-2 w-full"/>
          </div>
        </div>
      </fieldset>

      {/* Additional Information */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Additional Information</legend>
        <div className="mt-2">
          <label>Previous Beneficiary Status</label>
          <input type="text" name="PreviousBeneficiaryStatus" value={formData.AdditionalInformation.PreviousBeneficiaryStatus} onChange={(e)=>handleChange(e,['AdditionalInformation'])} className="border p-2 w-full"/>
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get Schemes'}
      </button>
    </form>
  );
}
