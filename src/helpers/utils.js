import { toast } from "react-toastify";

export const getCharsAfterIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(index);
  };
};
export const getCharsBeforeIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(0, index).trim();
  };
};

export const getProfile = () => {
  const uid = localStorage.getItem('rems_user_id');
  const profile = JSON.parse(localStorage.getItem('rems_user_profile'));
  return { uid, ...profile }
}

export const autoCapFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

export const currencyConverter = async (amount) => {
  return await fetch(`https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_CURRENCY_API_KEY}&base=USD&symbols=RWF,USD`)
    .then(async (response) => await response.json())
    .then(response => {
      const { RWF } = response.rates;
      const USDAmount = amount / RWF;
      return USDAmount;
    })
    .catch(err => {
      console.error('Currency conversion error', err);
      toast.error('Error occured in currency conversion');
      return { error: true };
    });
}