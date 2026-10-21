import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Camera, Trash2, User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const BasicsForm: React.FC = () => {
  const { data, updateBasics, updateMetadata } = useResume();
  const { basics, metadata } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Image must be under 4MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateBasics({ photoUrl: result });
        updateMetadata({ showPhoto: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateBasics({ photoUrl: '' });
    updateMetadata({ showPhoto: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo Upload Option */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {basics.photoUrl ? (
                <img
                  src={basics.photoUrl}
                  alt="Avatar preview"
                  className="w-14 h-14 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <User className="w-7 h-7" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload-input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Profile Photo (Optional)</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Square or portrait JPG, PNG (Max 4MB)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              {basics.photoUrl ? 'Change' : 'Upload'}
            </button>
            {basics.photoUrl && (
              <button
                type="button"
                onClick={removePhoto}
                className="text-xs p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-md border border-rose-200 dark:border-rose-800"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {basics.photoUrl && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">Display photo on resume</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={metadata.showPhoto}
                onChange={(e) => updateMetadata({ showPhoto: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        )}
      </div>

      {/* Basic Contact Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Alex Morgan"
              value={basics.fullName}
              onChange={(e) => updateBasics({ fullName: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Job Title / Headline</label>
          <input
            type="text"
            placeholder="e.g. Full-Stack Engineer"
            value={basics.headline}
            onChange={(e) => updateBasics({ headline: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Mail className="w-3 h-3 text-slate-400" /> Email *
          </label>
          <input
            type="email"
            placeholder="alex.morgan@email.com"
            value={basics.email}
            onChange={(e) => updateBasics({ email: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" /> Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={basics.phone}
            onChange={(e) => updateBasics({ phone: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> Location (City, State / Country)
          </label>
          <input
            type="text"
            placeholder="e.g. San Francisco, CA"
            value={basics.location}
            onChange={(e) => updateBasics({ location: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" /> Portfolio / Website
          </label>
          <input
            type="url"
            placeholder="https://alexmorgan.dev"
            value={basics.website || ''}
            onChange={(e) => updateBasics({ website: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Linkedin className="w-3 h-3 text-slate-400" /> LinkedIn Profile
          </label>
          <input
            type="text"
            placeholder="linkedin.com/in/alexmorgan"
            value={basics.linkedin || ''}
            onChange={(e) => updateBasics({ linkedin: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Github className="w-3 h-3 text-slate-400" /> GitHub Profile
          </label>
          <input
            type="text"
            placeholder="github.com/alexmorgan"
            value={basics.github || ''}
            onChange={(e) => updateBasics({ github: e.target.value })}
            className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Professional Summary / Career Objective
          </label>
          <span className="text-[10px] text-slate-400">2-4 sentences recommended</span>
        </div>
        <textarea
          rows={4}
          placeholder="Briefly describe your background, strongest skills, and major achievements..."
          value={basics.summary}
          onChange={(e) => updateBasics({ summary: e.target.value })}
          className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
        />
      </div>
    </div>
  );
};

