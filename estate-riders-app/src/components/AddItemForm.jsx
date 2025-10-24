import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

const defaultValues = {
  name: "",
  type: "bike",
  price: "",
  status: "available",
  condition: "excellent",
  battery: 100,
  location: "Main Gate",
  image: "",
};

export default function AddItemForm({ initialData = null, onSave, onCancel }) {
  const [form, setForm] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (initialData) {

      setForm({
        name: initialData.name ?? "",
        type: initialData.type ?? "bike",
        price: initialData.price ?? "",
        status: initialData.status ?? "available",
        condition: initialData.condition ?? "excellent",
        battery: initialData.battery ?? 100,
        location: initialData.location ?? "Main Gate",
        image: initialData.image ?? "",
      });
      setPreviewUrl(initialData.image ?? "");
    } else {
      setForm(defaultValues);
      setPreviewUrl("");
    }
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Vehicle name is required";
    if (form.price === "" || Number.isNaN(Number(form.price))) e.price = "Valid price is required";
    if (form.battery === "" || isNaN(Number(form.battery)) || form.battery < 0 || form.battery > 100) e.battery = "Battery must be 0–100";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    // clear that field's error
    setErrors((p) => ({ ...p, [key]: undefined }));
    if (key === "image") setPreviewUrl(value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      // normalize numeric fields
      price: Number(form.price),
      battery: Number(form.battery),
    };
    onSave && onSave(payload);
    // do not auto-reset if editing; parent can control
  };

  const handleReset = () => {
    setForm(defaultValues);
    setErrors({});
    setPreviewUrl("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{initialData ? "Edit Vehicle" : "Add Vehicle"}</h3>
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              type="button"
              className="p-2 rounded-lg hover:bg-gray-50"
              aria-label="Cancel"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* name / type */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.name ? "border-red-300" : "border-gray-300"}`}
              placeholder="e.g. EcoBike Pro"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 capitalize"
            >
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
              <option value="skates">Skates</option>
            </select>
          </div>
        </div>

        {/* price / status */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSh / hr)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">KSh</span>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={`w-full pl-14 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.price ? "border-red-300" : "border-gray-300"}`}
                placeholder="e.g. 250"
              />
            </div>
            {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 capitalize"
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* condition / battery */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={form.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 capitalize"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Battery (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.battery}
              onChange={(e) => handleChange("battery", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.battery ? "border-red-300" : "border-gray-300"}`}
            />
            {errors.battery && <p className="text-xs text-red-600 mt-1">{errors.battery}</p>}
          </div>
        </div>

        {/* location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option>Main Gate</option>
            <option>Community Center</option>
            <option>Sports Complex</option>
            <option>Park Entrance</option>
          </select>
        </div>

        {/* image url + preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://example.com/bike.jpg (or emoji like 🚴 )"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
          {previewUrl ? (
            <div className="mt-3">
              {/* if it's an http(s) url, show image; otherwise show text (emoji) */}
              {/^https?:\/\//i.test(previewUrl) ? (
                <img src={previewUrl} alt="preview" className="w-full h-48 object-cover rounded-md border" />
              ) : (
                <div className="text-6xl text-center py-6">{previewUrl}</div>
              )}
            </div>
          ) : null}
        </div>

        {/* actions */}
        <div className="flex items-center gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600"
          >
            <Save size={16} /> {initialData ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}
