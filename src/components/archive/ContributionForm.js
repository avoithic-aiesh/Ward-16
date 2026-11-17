"use client";

/**
 * src/components/archive/ContributionForm.js
 *
 * Community Heritage Contribution Form with robust client-side validation,
 * image preview, attribution preference options, and privacy protections.
 */

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { ARCHIVE_CATEGORIES } from "@/data/communityArchiveData";

export default function ContributionForm() {
  const { t, isNepali, language } = useLanguage();

  const [formData, setFormData] = useState({
    contributorName: "",
    contributorRole: "",
    email: "",
    attributionPreference: "real_name",
    title: "",
    heritageLocation: "22-dhara",
    category: "oral_histories",
    content: "",
    photoCaption: "",
    photoData: null,
    photoOwnershipConfirmed: false,
    consentAgreed: false,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for that field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    setPhotoError("");

    if (!file) {
      setPhotoPreview(null);
      setFormData((prev) => ({ ...prev, photoData: null }));
      return;
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoError(
        isNepali
          ? "कृपया मान्य तस्बिर फाइल अपलोड गर्नुहोस् (JPEG, PNG, वा WebP)।"
          : "Invalid file format. Please upload a JPEG, PNG, or WebP image."
      );
      return;
    }

    // Validate size (max 4MB)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setPhotoError(
        isNepali
          ? "तस्बिर फाइल ४ मेगाबाइटभन्दा सानो हुनुपर्छ।"
          : "Photograph must be under 4MB in size."
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setFormData((prev) => ({ ...prev, photoData: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoError("");
    setFormData((prev) => ({
      ...prev,
      photoData: null,
      photoOwnershipConfirmed: false,
      photoCaption: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setIsSubmitting(true);

    // Client-side quick check
    const clientErrors = {};
    if (formData.attributionPreference !== "anonymous" && !formData.contributorName.trim()) {
      clientErrors.contributorName = isNepali
        ? "कृपया आफ्नो नाम वा उपनाम प्रविष्ट गर्नुहोस्।"
        : "Please provide your name or pseudonym.";
    }

    if (!formData.title.trim() || formData.title.trim().length < 5) {
      clientErrors.title = isNepali
        ? "कथाको शीर्षक कम्तीमा ५ अक्षरको हुनुपर्छ।"
        : "Title must be at least 5 characters.";
    }

    if (!formData.content.trim() || formData.content.trim().length < 40) {
      clientErrors.content = isNepali
        ? "कृपया आफ्नो कथा कम्तीमा ४० अक्षरमा लेख्नुहोस्।"
        : "Please write your story in more detail (at least 40 characters).";
    }

    if (!formData.consentAgreed) {
      clientErrors.consentAgreed = isNepali
        ? "अभिलेखमा समावेश गर्न तपाईंले सर्तहरू र स्वीकृति दिनु अनिवार्य छ।"
        : "You must accept the archival consent terms to submit.";
    }

    if (formData.photoData && !formData.photoOwnershipConfirmed) {
      clientErrors.photoOwnershipConfirmed = isNepali
        ? "तस्बिरको स्वामित्व वा अनुमति पुष्टि गर्नुहोस्।"
        : "Please confirm ownership of the uploaded photograph.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/community-archive/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setGeneralError(data.errorNepali || data.error || "Submission failed.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmissionResult(data);
      setIsSubmitting(false);
    } catch {
      setGeneralError(
        isNepali
          ? "इन्टरनेट वा सर्भर त्रुटि आयो। कृपया पुनः प्रयास गर्नुहोस्।"
          : "Network or server error. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      contributorName: "",
      contributorRole: "",
      email: "",
      attributionPreference: "real_name",
      title: "",
      heritageLocation: "22-dhara",
      category: "oral_histories",
      content: "",
      photoCaption: "",
      photoData: null,
      photoOwnershipConfirmed: false,
      consentAgreed: false,
    });
    setPhotoPreview(null);
    setErrors({});
  };

  // SUCCESS CONFIRMATION STATE
  if (submissionResult) {
    return (
      <div className="bg-ivory border border-gold/40 rounded-sm shadow-card p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto text-3xl font-display">
          ✓
        </div>

        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-charcoal">
          {t("communityArchive.form.successTitle", "Story Successfully Submitted for Moderation")}
        </h2>

        <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed">
          {t(
            "communityArchive.form.successText",
            "Thank you for preserving the cultural memory of Ward 16. Your story has been received and assigned reference ID:"
          )}
        </p>

        <div className="p-3 bg-beige/40 border border-beige font-mono text-sm sm:text-base font-bold text-burgundy rounded-xs inline-block">
          {submissionResult.referenceId}
        </div>

        <div className="p-4 bg-beige/25 border-l-3 border-gold text-xs text-charcoal/70 text-left rounded-r-xs space-y-1">
          <p className="font-semibold text-charcoal">
            {isNepali ? "समीक्षा तथा प्रकाशन प्रक्रिया:" : "Moderation & Review Process:"}
          </p>
          <p>
            {t(
              "communityArchive.form.moderationNotice",
              "Our editorial team reviews all community submissions to ensure respectful attribution, family consent, and cultural dignity before publishing."
            )}
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/community-archive"
            className="px-6 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-charcoal-soft transition-colors"
          >
            {isNepali ? "सामुदायिक अभिलेख हेर्नुहोस्" : "Browse Community Archive"}
          </Link>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-ivory text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
          >
            {t("communityArchive.form.submitAnother", "Submit Another Story")}
          </button>
        </div>
      </div>
    );
  }

  // CONTRIBUTION FORM STATE
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory border border-beige rounded-sm shadow-xs p-6 sm:p-10 space-y-8 max-w-3xl mx-auto"
      noValidate
    >
      {generalError && (
        <div className="p-4 bg-terracotta/10 border-l-4 border-terracotta text-sm text-terracotta rounded-r-xs">
          {generalError}
        </div>
      )}

      {/* Section 1: Contributor Info */}
      <fieldset className="space-y-4">
        <legend className="font-display font-semibold text-lg text-charcoal border-b border-beige pb-2 w-full">
          {t("communityArchive.form.personalDetails", "1. Contributor Details")}
        </legend>

        {/* Attribution Preference */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-charcoal">
            {t("communityArchive.form.attributionPrefLabel", "How would you like to be credited?")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: "real_name", label: t("communityArchive.form.attrRealName", "Full Name") },
              { id: "pseudonym", label: t("communityArchive.form.attrPseudonym", "Pseudonym / Pen Name") },
              { id: "anonymous", label: t("communityArchive.form.attrAnonymous", "Completely Anonymous") },
            ].map((pref) => (
              <label
                key={pref.id}
                className={`flex items-center gap-2 p-2.5 border rounded-xs text-xs cursor-pointer transition-all ${
                  formData.attributionPreference === pref.id
                    ? "border-gold bg-gold/10 font-semibold text-charcoal"
                    : "border-beige bg-ivory text-charcoal/70 hover:bg-beige/30"
                }`}
              >
                <input
                  type="radio"
                  name="attributionPreference"
                  value={pref.id}
                  checked={formData.attributionPreference === pref.id}
                  onChange={handleChange}
                  className="accent-burgundy"
                />
                <span>{pref.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contributor Name (hidden or optional if anonymous) */}
        {formData.attributionPreference !== "anonymous" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contributorName" className="block text-xs font-semibold text-charcoal mb-1">
                {t("communityArchive.form.nameLabel", "Your Name / Preferred Display Name")} *
              </label>
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                value={formData.contributorName}
                onChange={handleChange}
                placeholder={t("communityArchive.form.namePlaceholder", "e.g. Laxmi Maya Shakya")}
                className={`w-full px-3 py-2 text-sm bg-ivory border ${
                  errors.contributorName ? "border-terracotta" : "border-beige"
                } rounded-sm focus:border-gold focus:outline-none`}
              />
              {errors.contributorName && (
                <p className="text-xs text-terracotta mt-1">{errors.contributorName}</p>
              )}
            </div>

            <div>
              <label htmlFor="contributorRole" className="block text-xs font-semibold text-charcoal mb-1">
                {t("communityArchive.form.roleLabel", "Community Role / Affiliation (Optional)")}
              </label>
              <input
                id="contributorRole"
                name="contributorRole"
                type="text"
                value={formData.contributorRole}
                onChange={handleChange}
                placeholder={t("communityArchive.form.rolePlaceholder", "e.g. Lifelong Balaju Resident")}
                className="w-full px-3 py-2 text-sm bg-ivory border border-beige rounded-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Private Email for moderation verification */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-charcoal mb-1">
            {t("communityArchive.form.emailLabel", "Contact Email (Private — for moderation follow-up only)")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("communityArchive.form.emailPlaceholder", "your.email@example.com")}
            className={`w-full px-3 py-2 text-sm bg-ivory border ${
              errors.email ? "border-terracotta" : "border-beige"
            } rounded-sm focus:border-gold focus:outline-none`}
          />
          {errors.email && <p className="text-xs text-terracotta mt-1">{errors.email}</p>}
          <p className="text-[11px] text-charcoal/50 mt-1">
            {isNepali
              ? "तपाईंको इमेल कहिल्यै सार्वजनिक रूपमा देखाइने छैन। सम्पादकीय टोलीलाई थप जानकारी आवश्यक परेमा मात्र प्रयोग गरिनेछ।"
              : "Your email is never shared or displayed publicly. Used solely if editors need to verify permissions."}
          </p>
        </div>
      </fieldset>

      {/* Section 2: Story Details */}
      <fieldset className="space-y-4">
        <legend className="font-display font-semibold text-lg text-charcoal border-b border-beige pb-2 w-full">
          {t("communityArchive.form.storyDetails", "2. Your Story or Memory")}
        </legend>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-semibold text-charcoal mb-1">
            {t("communityArchive.form.storyTitleLabel", "Story Title")} *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder={t("communityArchive.form.storyTitlePlaceholder", "e.g. The Morning Bell of Balaju")}
            className={`w-full px-3 py-2 text-sm bg-ivory border ${
              errors.title ? "border-terracotta" : "border-beige"
            } rounded-sm focus:border-gold focus:outline-none`}
          />
          {errors.title && <p className="text-xs text-terracotta mt-1">{errors.title}</p>}
        </div>

        {/* Heritage Location & Category Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="heritageLocation" className="block text-xs font-semibold text-charcoal mb-1">
              {t("communityArchive.form.locationLabel", "Associated Heritage Location")} *
            </label>
            <select
              id="heritageLocation"
              name="heritageLocation"
              value={formData.heritageLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-ivory border border-beige rounded-sm focus:border-gold focus:outline-none"
            >
              <option value="22-dhara">
                {isNepali ? "२२ धारा (बालाजु बाइसधारा)" : "22 Dhara (Balaju Baisdhara)"}
              </option>
              <option value="pyatho-ajima">
                {isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple"}
              </option>
              <option value="ward-16-general">
                {isNepali ? "काठमाडौँ वडा १६ समग्र" : "General Ward 16 Heritage"}
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-charcoal mb-1">
              {t("communityArchive.form.categoryLabel", "Category")} *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-ivory border border-beige rounded-sm focus:border-gold focus:outline-none"
            >
              {ARCHIVE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {isNepali ? cat.label.ne : cat.label.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div>
          <label htmlFor="content" className="block text-xs font-semibold text-charcoal mb-1">
            {t("communityArchive.form.contentLabel", "Story Narrative / Oral History Transcript")} *
          </label>
          <textarea
            id="content"
            name="content"
            rows={7}
            value={formData.content}
            onChange={handleChange}
            placeholder={t(
              "communityArchive.form.contentPlaceholder",
              "Write your recollection, elder testimony, or historical memory in detail…"
            )}
            className={`w-full px-3 py-2 text-sm bg-ivory border ${
              errors.content ? "border-terracotta" : "border-beige"
            } rounded-sm focus:border-gold focus:outline-none leading-relaxed`}
          />
          {errors.content && <p className="text-xs text-terracotta mt-1">{errors.content}</p>}
          <p className="text-[11px] text-charcoal/50 mt-1">
            {isNepali ? "कम्तीमा ४० अक्षर र बढीमा ५,००० अक्षर।" : "Minimum 40 characters, maximum 5,000 characters."}
          </p>
        </div>
      </fieldset>

      {/* Section 3: Photo Upload */}
      <fieldset className="space-y-4">
        <legend className="font-display font-semibold text-lg text-charcoal border-b border-beige pb-2 w-full">
          {t("communityArchive.form.mediaDetails", "3. Archival Photograph (Optional)")}
        </legend>

        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">
            {t("communityArchive.form.photoUploadLabel", "Upload Historic or Archival Photograph")}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoUpload}
            className="block w-full text-xs text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-beige file:text-charcoal hover:file:bg-gold/30 cursor-pointer"
          />
          <p className="text-[11px] text-charcoal/50 mt-1">
            {t("communityArchive.form.photoUploadHint", "JPEG, PNG, or WebP. Maximum size: 4MB.")}
          </p>
          {photoError && <p className="text-xs text-terracotta mt-1">{photoError}</p>}
        </div>

        {/* Photo Preview & Confirmation */}
        {photoPreview && (
          <div className="p-4 bg-beige/30 border border-beige rounded-sm space-y-3">
            <div className="relative aspect-[16/9] max-w-sm rounded-xs overflow-hidden border border-beige">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Upload preview" className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 p-1 bg-charcoal/80 hover:bg-charcoal text-ivory rounded-full text-xs"
                title="Remove photo"
              >
                ✕
              </button>
            </div>

            <div>
              <label htmlFor="photoCaption" className="block text-xs font-semibold text-charcoal mb-1">
                {t("communityArchive.form.photoCaptionLabel", "Photograph Caption & Approximate Year")}
              </label>
              <input
                id="photoCaption"
                name="photoCaption"
                type="text"
                value={formData.photoCaption}
                onChange={handleChange}
                placeholder={t("communityArchive.form.photoCaptionPlaceholder", "e.g. Balaju spouts, circa 1982.")}
                className="w-full px-3 py-2 text-xs bg-ivory border border-beige rounded-sm focus:border-gold focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-charcoal cursor-pointer">
              <input
                type="checkbox"
                name="photoOwnershipConfirmed"
                checked={formData.photoOwnershipConfirmed}
                onChange={handleChange}
                className="mt-0.5 accent-burgundy"
              />
              <span>
                {t(
                  "communityArchive.form.photoOwnershipLabel",
                  "I confirm that I own this photograph or have permission from my family/community to archive it here."
                )} *
              </span>
            </label>
            {errors.photoOwnershipConfirmed && (
              <p className="text-xs text-terracotta">{errors.photoOwnershipConfirmed}</p>
            )}
          </div>
        )}
      </fieldset>

      {/* Section 4: Ethics & Consent */}
      <fieldset className="space-y-4">
        <legend className="font-display font-semibold text-lg text-charcoal border-b border-beige pb-2 w-full">
          {t("communityArchive.form.consentDetails", "4. Archival Consent & Permissions")}
        </legend>

        <div className="p-4 bg-beige/30 border border-beige rounded-sm space-y-2">
          <label className="flex items-start gap-2.5 text-xs text-charcoal leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              name="consentAgreed"
              checked={formData.consentAgreed}
              onChange={handleChange}
              className="mt-1 accent-burgundy"
            />
            <span>
              {t(
                "communityArchive.form.consentLabel",
                "I understand that my contribution will be reviewed by the archive moderation team before publication, and I consent to its inclusion in the Ward 16 Digital Heritage Archive for non-commercial, cultural and educational purposes."
              )} *
            </span>
          </label>
          {errors.consentAgreed && (
            <p className="text-xs text-terracotta pl-6">{errors.consentAgreed}</p>
          )}
        </div>
      </fieldset>

      {/* Submit Button */}
      <div className="pt-2 flex items-center justify-between">
        <Link
          href="/community-archive"
          className="text-xs font-semibold text-charcoal/70 hover:text-charcoal underline"
        >
          {t("communityArchive.backToArchive", "← Back to Community Archive")}
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-burgundy hover:bg-burgundy-light disabled:bg-charcoal/30 text-ivory font-body font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {isSubmitting
            ? t("communityArchive.form.submitting", "Submitting for Review…")
            : t("communityArchive.form.submitBtn", "Submit to Archive Moderation")}
        </button>
      </div>
    </form>
  );
}
