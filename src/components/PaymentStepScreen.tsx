import React, { useState } from 'react';
import { supabase } from '../supabase';

interface PaymentStepScreenProps {
  studentName: string;
  phoneNumber: string;
  email: string;
  onCompletePayment: (paymentData: {
    upiNumber: string;
    transactionRef: string;
    amount: string;
    screenshotUrl: string;
  }) => void;
  onBackToDetails: () => void;
}

export const PaymentStepScreen: React.FC<PaymentStepScreenProps> = ({
  studentName,
  phoneNumber,
  email,
  onCompletePayment,
  onBackToDetails,
}) => {
  const [upiId] = useState('mingle.manipal@okaxis');
  const [phonePeNumber] = useState('7676878700');
  const [copied, setCopied] = useState(false);

  const [transactionRef, setTransactionRef] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScreenshotSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      const url = URL.createObjectURL(file);
      setScreenshotPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      alert('Please enter your 12-digit UPI UTR / Transaction Reference ID.');
      return;
    }
    if (!screenshotFile && !screenshotPreview) {
      alert('Please upload a screenshot of your payment confirmation.');
      return;
    }

    setIsSubmitting(true);

    try {
      let downloadUrl = screenshotPreview || '';

      // Try uploading screenshot to Supabase Storage with fallback to Base64 / preview URL
      if (screenshotFile) {
        try {
          const fileName = `${phoneNumber || 'user'}_${Date.now()}`;
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from('payment_screenshots')
            .upload(fileName, screenshotFile, { upsert: true });

          if (!uploadErr && uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from('payment_screenshots')
              .getPublicUrl(fileName);
            if (publicUrlData?.publicUrl) {
              downloadUrl = publicUrlData.publicUrl;
            }
          }
        } catch (stErr) {
          console.warn("Supabase Storage upload warning (using fallback preview):", stErr);
        }

        if (!downloadUrl || downloadUrl === screenshotPreview) {
          downloadUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(screenshotFile);
          });
        }
      }

      // Persist registration request to Supabase pending_registrations table
      try {
        await supabase.from('pending_registrations').insert([
          {
            student_name: studentName,
            phone_number: phoneNumber,
            email: email,
            transaction_ref: transactionRef,
            amount: '₹6.69',
            screenshot_url: downloadUrl,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (dbErr) {
        console.warn("Supabase pending_registrations insert warning:", dbErr);
      }

      onCompletePayment({
        upiNumber: upiId,
        transactionRef,
        amount: '₹6.69',
        screenshotUrl: downloadUrl,
      });
    } catch (error) {
      console.error("Error in payment submit flow:", error);
      onCompletePayment({
        upiNumber: upiId,
        transactionRef,
        amount: '₹6.69',
        screenshotUrl: screenshotPreview || '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen py-8 px-4 flex flex-col items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow top-10 left-1/2 -translate-x-1/2 opacity-30"></div>

      <div className="w-full max-w-md relative z-10 space-y-5">
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDetails}
            className="p-2 rounded-full glass-panel text-[#e3bebd] hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <div className="text-[10px] font-bold text-[#5edda8] tracking-widest uppercase flex items-center gap-1">
              <span>STEP 2 OF 3 • VERIFICATION PAYMENT</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Campus Pass Payment</h1>
          </div>
        </div>

        {/* Limited Time Fresher Offer Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FF4B5C]/25 via-[#6C4AB6]/25 to-[#5edda8]/25 border border-[#5edda8]/40 flex items-center justify-between shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#5edda8]">local_offer</span>
            <div>
              <p className="text-xs font-black text-white tracking-wide uppercase">
                LIMITED TIME FRESHER OFFER!
              </p>
              <p className="text-[10px] text-[#e3bebd]">Special Manipal Freshers Discount Applied</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] line-through text-[#e3bebd] block">₹29.69</span>
            <span className="text-sm font-black text-[#5edda8]">₹6.69</span>
          </div>
        </div>

        {/* Payment Details Box */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5">
          {/* User Info Bar */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-white">{studentName}</p>
              <p className="text-[11px] text-[#e3bebd] font-mono">Phone: {phoneNumber || 'Not provided'}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#5edda8]/20 text-[#5edda8] border border-[#5edda8]/40 text-[10px] font-black">
              FRESHER OFFER: ₹6.69
            </span>
          </div>

          {/* Official Payment UPI & QR Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2a1718] to-[#3a1b2a] border border-[#ff5260]/30 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-[#ffb3b3] text-[10px] font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>OFFICIAL MANIPAL CAMPUS UPI</span>
            </div>

            {/* Simulated UPI QR Code */}
            <div className="w-36 h-36 mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col items-center justify-center border-2 border-[#FF4B5C]">
              <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-gray-800 p-2">
                <span className="material-symbols-outlined text-4xl text-[#FF4B5C]">qr_code_2</span>
                <span className="text-[9px] font-black font-mono tracking-wider text-black">SCAN & PAY ₹6.69</span>
                <span className="text-[7px] font-bold text-[#FF4B5C] uppercase mt-0.5">FRESHER DISCOUNT</span>
              </div>
            </div>

            {/* UPI ID Copy Field */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#e3bebd] uppercase font-semibold">Official UPI ID</span>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/15">
                <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">{upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-lg bg-[#FF4B5C] text-white text-[10px] font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">content_copy</span>
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Alternative PhonePe / GPay Number */}
            <div className="text-[11px] text-[#e3bebd] pt-1 border-t border-white/10 flex justify-between items-center">
              <span>GPay / PhonePe Number:</span>
              <span className="font-mono font-bold text-white">{phonePeNumber}</span>
            </div>
          </div>

          {/* Payment Proof Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1">
                12-Digit UPI UTR / Transaction Ref ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 982144510298"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C] font-mono tracking-wider"
              />
            </div>

            {/* Upload Payment Screenshot Box */}
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1.5">
                Upload Payment Screenshot *
              </label>

              <label className="block w-full p-4 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#FF4B5C] transition-colors cursor-pointer text-center bg-white/5 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotSelect}
                  className="hidden"
                />

                {screenshotPreview ? (
                  <div className="space-y-2">
                    <img
                      src={screenshotPreview}
                      alt="Payment Screenshot"
                      className="max-h-36 mx-auto rounded-lg border border-white/20 object-contain shadow-md"
                    />
                    <p className="text-[11px] text-[#5edda8] font-bold flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Screenshot uploaded! Tap to change</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 py-2">
                    <span className="material-symbols-outlined text-3xl text-[#ffb3b3] group-hover:scale-110 transition-transform">
                      add_photo_alternate
                    </span>
                    <p className="text-xs font-bold text-white">Tap to upload GPay / PhonePe Screenshot</p>
                    <p className="text-[10px] text-[#e3bebd]/70">PNG, JPG or WEBP accepted</p>
                  </div>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#FF4B5C]/25 hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>NOTIFYING REGISTRAR ADMIN...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">send</span>
                  <span>SUBMIT PAYMENT TO ADMIN & START</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
