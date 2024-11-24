import React, { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import Button from "@/components/UI/Button";

import "katex/dist/katex.min.css";

const PolyRemainder = () => {
  const [task, setTask] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

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
      }
      while (div.length && div[div.length - 1] === 0) div.pop();
    }
    return div;
  };

  const checkAnswer = () => {
    const { modulus, dividend, p } = task;
    const correctRemainder = calculateRemainder(dividend, modulus, p);
    const userPoly = reverse(userAnswer)
      .split(",")
      .map((x) => (parseInt(x.trim(), 10) || 0) % p);

    if (JSON.stringify(correctRemainder) === JSON.stringify(userPoly)) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((max) => Math.max(max, newStreak));
        return newStreak;
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      randomizeTask();
    } else {
      setStreak(0);
      setCorrectAnswer(correctRemainder);
    }
  };

  useEffect(() => {
    randomizeTask();
  }, []);

  if (!task) return null;

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
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
        <input
          type="text"
          placeholder="Enter coefficients (e.g., 2,3,1 - from high to low order)"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full max-w-lg text-lg mb-4"
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
        <Button onClick={checkAnswer}>Submit Answer</Button>
        <div className="mt-6 text-lg">
          <h3>Score: {score}</h3>
          <h3>Current Streak: {streak}</h3>
          <h3>Max Streak: {maxStreak}</h3>
        </div>
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
