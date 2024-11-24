import React, { useState } from "react";
import crypto from "crypto";
import Button from "@/components/UI/Button";

const VerifyToken = () => {
  const [inputHash, setInputHash] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const secretKey = "damn-why-is-this-open-source"; // Use the same key as in the game component

  const verifyToken = (hash) => {
    const parts = hash.split("-");
    if (parts.length !== 3) {
      setVerificationResult({ valid: false, message: "Invalid token format." });
      return;
    }

    const [tokenHash, maxStreak, timestamp] = parts;
    const data = `${maxStreak}-${timestamp}`;
    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("hex");

    if (calculatedHash === tokenHash) {
      const timeAchieved = new Date(parseInt(timestamp, 10)).toLocaleString();
      setVerificationResult({
        valid: true,
        message: `Token verified! Max Streak: ${maxStreak}, Time: ${timeAchieved}`,
      });
    } else {
      setVerificationResult({ valid: false, message: "Token verification failed." });
    }
  };

  const handleVerify = () => {
    if (!inputHash) {
      setVerificationResult({ valid: false, message: "Please enter a token to verify." });
      return;
    }
    verifyToken(inputHash);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Token</h1>
        <input
          type="text"
          placeholder="Enter verification token"
          value={inputHash}
          onChange={(e) => setInputHash(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full text-lg mb-4"
        />
        <Button
          onClick={handleVerify}
        >
          Verify
        </Button>
        {verificationResult && (
          <div
            className={`mt-4 p-4 rounded-lg`}
          >
            <p className="text-lg">{verificationResult.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyToken;
