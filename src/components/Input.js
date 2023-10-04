import { useState, useEffect } from "react";

const Input = () => {
  const [amount, setAmount] = useState("1");
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}=&from=${firstCurrency}&to=${secondCurrency}`
          );
          const data = await res.json();
          console.log("data", data);
          // console.log("data.rates[secondCurrency]", data.rates[secondCurrency]);
          setConvertedAmount(data?.rates[secondCurrency]);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      setIsLoading(false);
    },
    [amount, firstCurrency, secondCurrency]
  );

  function handleAmount(e) {
    console.log("handleAmount fired up");

    setAmount(e.target.value);
    if (firstCurrency === secondCurrency) setConvertedAmount(e.target.value);
  }
  function handleFirstCurrency(e) {
    console.log("handleFirstCurrency fired up");
    console.log(e.target.value);
    console.log(typeof e.target.value);

    if (e.target.value !== secondCurrency) {
      setFirstCurrency(e.target.value);
    } else {
      setConvertedAmount(amount);
      setFirstCurrency(e.target.value);
    }
  }

  function handleSecondCurrency(e) {
    console.log("handleSecondCurrency fired up");
    console.log(e.target.value);
    console.log(typeof e.target.value);

    if (e.target.value !== firstCurrency) {
      setSecondCurrency(e.target.value);
    } else {
      setConvertedAmount(amount);
      setSecondCurrency(e.target.value);
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
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
      <p>{firstCurrency}</p>
      <p>
        {amount} {firstCurrency} is equal to {convertedAmount} {secondCurrency}.
      </p>
    </>
  );
};

export default Input;
