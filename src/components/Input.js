import { useState, useEffect } from "react";

const Input = () => {
  const [amount, setAmount] = useState("1");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}=&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          console.log("data", data);
          // console.log("data.rates[secondCurrency]", data.rates[secondCurrency]);
          setConvertedAmount(data?.rates[toCur]);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      setIsLoading(false);
    },
    [amount, fromCur, toCur]
  );

  function handleAmount(e) {
    console.log("handleAmount fired up");

    setAmount(e.target.value);
    if (fromCur === toCur) setConvertedAmount(e.target.value);
  }
  function handleFirstCurrency(e) {
    console.log("handleFirstCurrency fired up");
    console.log(e.target.value);
    console.log(typeof e.target.value);

    if (e.target.value !== toCur) {
      setFromCur(e.target.value);
    } else {
      setConvertedAmount(amount);
      setFromCur(e.target.value);
    }
  }

  function handleSecondCurrency(e) {
    console.log("handleSecondCurrency fired up");
    console.log(e.target.value);
    console.log(typeof e.target.value);

    if (e.target.value !== fromCur) {
      setToCur(e.target.value);
    } else {
      setConvertedAmount(amount);
      setToCur(e.target.value);
    }
  }

  return (
    <>

      <input
        type="text"
        value={amount}
        onChange={(e) => handleAmount(e)}
        disabled={isLoading}
      />
      <select
        onChange={(e) => handleFirstCurrency(e)}
        defaultValue="USD"
        disabled={isLoading}

      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => handleSecondCurrency(e)}
        defaultValue="EUR"
        disabled={isLoading}
        className="select"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
      <p>
        {amount} {fromCur} is equal to {convertedAmount} {toCur}.
      </p>
    </>
  );
};

export default Input;
