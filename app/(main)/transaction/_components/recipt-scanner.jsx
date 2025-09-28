"use client";
import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Helper function to convert file to base64 in browser
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setLoading(true);

    try {
      // Convert file to base64 string using FileReader (browser API)
      const base64String = await fileToBase64(file);
     
      // Create a plain object with file data
      const fileData = {
        data: base64String,
        type: file.type,
        name: file.name,
        size: file.size
      };
      
      // Call the server action directly
      const result = await scanReceipt(fileData);

      if (result) {
        onScanComplete(result);
        toast.success("Receipt scanned successfully!");
      } else {
        throw new Error("No data returned from receipt scan");
      }
      
    } catch (error) {
      console.error("Receipt scan error:", error);
      
      // Show user-friendly error message
      if (error.message.includes("API key")) {
        toast.error("AI service not configured. Please contact support.");
      } else if (error.message.includes("quota") || error.message.includes("limit")) {
        toast.error("AI service temporarily unavailable. Please try again later.");
      } else if (error.message.includes("receipt") || error.message.includes("image")) {
        toast.error(error.message);
      } else {
        toast.error("Failed to scan receipt. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}