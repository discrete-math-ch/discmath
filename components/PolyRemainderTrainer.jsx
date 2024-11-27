import React, { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import Button from "@/components/UI/Button";
import crypto from "crypto";

import "katex/dist/katex.min.css";

const PolyRemainder = () => {
  const [task, setTask] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [token, setToken] = useState(null);
  const [answered, setAnswered] = useState(false); // Tracks if the question was already answered

  const secretKey = "damn-why-is-this-open-source";

  const generateToken = (maxStreak) => {
    const timestamp = Date.now();
    const data = `${maxStreak}-${timestamp}`;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("hex");
    return `${hash}-${maxStreak}-${timestamp}`;
  };

  const reverse = (s) => {
    return s.split(/(?:)/u).reverse().join("");
  };

  const generatePolynomial = (deg, p) => {
    const coefficients = Array.from({ length: deg + 1 }, () =>
      Math.floor(Math.random() * p)
    );

    coefficients[deg] = Math.floor(Math.random() * (p - 1)) + 1;

    return coefficients;
  };

  const polynomialToLatex = (poly) => {
    if (!poly.length) return "0"; // Explicitly show zero if the polynomial is empty
    return poly
      .map((coeff, index) => {
        if (coeff === 0) return null;
        const term =
          (coeff > 1 ? coeff : "") + (index > 0 ? (index === 1 ? `x` : `x^{${index}}`) : "");
        return index > 0 ? term : `${coeff}`;
      })
      .filter(Boolean)
      .reverse()
      .join(" + ");
  };

  const randomizeTask = () => {
    const primes = [2, 3, 5, 7, 11];
    const p = primes[Math.floor(Math.random() * primes.length)];

    const modulusDegree = Math.floor(Math.random() * 3) + 1;
    const modulus = generatePolynomial(modulusDegree, p);
    const dividendDegree = Math.floor(Math.random() * modulusDegree) + modulusDegree;
    const dividend = generatePolynomial(dividendDegree, p);

    setTask({ modulus, dividend, p });
    setUserAnswer("");
    setCorrectAnswer(null);
    setAnswered(false); 
  };

  const calculateRemainder = (dividend, modulus, p) => {
    const modDeg = modulus.length - 1;
    const div = [...dividend];
    while (div.length >= modulus.length) {
      const leadingCoeff = div[div.length - 1];
      const factor = (leadingCoeff * Math.pow(modulus[modDeg], p - 2)) % p;
      const offset = div.length - modulus.length;
      for (let i = 0; i < modulus.length; i++) {
        div[offset + i] = (div[offset + i] - factor * modulus[i] + p) % p;
        if (div[offset + i] < 0) div[offset + i] += p; // Ensure no negative coefficients
      }
      while (div.length && div[div.length - 1] === 0) div.pop();
    }
    return div;
  };

  const checkAnswer = () => {
    if (answered) return; // Prevent resubmission

    const { modulus, dividend, p } = task;
    const correctRemainder = calculateRemainder(dividend, modulus, p);
    const userPoly = reverse(userAnswer)
  .split(",")
  .map((x) => {
    const parsed = parseInt(x.trim(), 10);
    return isNaN(parsed) ? 0 : parsed % p;
  });

    setAnswered(true); // Mark as answered

    if (JSON.stringify(correctRemainder) === JSON.stringify(userPoly)) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((max) => {
          const updatedMax = Math.max(max, newStreak);
          if (updatedMax > max) {
            // Generate a new token when maxStreak is updated
            const newToken = generateToken(updatedMax);
            setToken(newToken);
          }
          return updatedMax;
        });
        return newStreak;
      });
      randomizeTask();
    } else {
      setStreak(0);
      setCorrectAnswer(correctRemainder);
    }
  };

  const copyTokenToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token).then(() => {
        alert("Verification token copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    randomizeTask();

    // Clear token on page reload
    setToken(null);
  }, []);

  if (!task) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="shadow-md rounded-lg p-6 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Polynomial Remainder Practice</h1>
        <div className="text-xl mb-4">
          <BlockMath>
            {`\\text{GF}(${task.p})[x]_{${polynomialToLatex(task.modulus)}}`}
          </BlockMath>
          <BlockMath>
            {`R_{${polynomialToLatex(task.modulus)}}(${polynomialToLatex(
              task.dividend
            )}) = \\dots`}
          </BlockMath>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter coefficients (e.g., 2,3,1 - from high to low order)"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full max-w-lg text-lg mb-4"
            disabled={answered}
          />
          <div className="text-lg">
          <BlockMath>
            {`${polynomialToLatex(
              reverse(userAnswer)
                .split(",")
                .map((x) => (parseInt(x.trim(), 10) || 0) % task.p)
            )}`}
          </BlockMath>
        </div>
          <Button onClick={checkAnswer} disabled={answered} className="mt-2">
            Submit Answer
          </Button>
        </div>
        <div className="mt-6 text-lg">
          <h3>Score: {score}</h3>
          <h3>Current Streak: {streak}</h3>
          <h3>Max Streak: {maxStreak}</h3>
        </div>
        {token && (
          <div className="mt-4">
            <Button onClick={copyTokenToClipboard}>Copy Token</Button>
          </div>
        )}
        {correctAnswer && (
          <div className="mt-4 text-red-500">
            <h3>Correct Answer:</h3>
            <BlockMath>{polynomialToLatex(correctAnswer)}</BlockMath>
            <Button onClick={randomizeTask} className="mt-4">
              Next Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolyRemainder;
