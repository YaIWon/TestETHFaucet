import axios from 'axios';
import Web3 from 'web3';

const apiUrl = 'https://aglawson.uw.r.appspot.com';
const web3 = new Web3('<ethereum_provider_url>');

// Get the current gas price in Wei
export const getGasPrice = async () => {
  const gasPrice = await web3.eth.getGasPrice();
  return web3.utils.fromWei(gasPrice, 'gwei');
};

// Get the transaction count of an Ethereum address
export const getTransactionCount = async (address) => {
  const count = await web3.eth.getTransactionCount(address);
  return count;
};

// Send Ether from one address to another
export const sendEther = async (sender, receiver, amount) => {
  const txObject = {
    from: sender,
    to: receiver,
    value: web3.utils.toWei(amount, 'ether'),
  };

  const gas = await web3.eth.estimateGas(txObject);
  txObject.gas = gas;

  const signedTx = await web3.eth.accounts.signTransaction(txObject, '<private_key>');
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return txReceipt.transactionHash;
};

// Get the ERC20 token balance of an Ethereum address
export const getTokenBalance = async (tokenContractAddress, userAddress) => {
  const tokenContract = new web3.eth.Contract(ERC20ABI, tokenContractAddress);
  const balance = await tokenContract.methods.balanceOf(userAddress).call();
  return balance;
};

// Call a function on a smart contract
export const callContractFunction = async (contractAddress, contractABI, functionName, parameters) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const result = await contract.methods[functionName](...parameters).call();
  return result;
};

// Send a transaction to a smart contract function
export const sendContractTransaction = async (contractAddress, contractABI, functionName, parameters, sender) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const data = contract.methods[functionName](...parameters).encodeABI();

  const txObject = {
    from: sender,
    to: contractAddress,
    data: data,
  };

  const gas = await web3.eth.estimateGas(txObject);
  txObject.gas = gas;

  const signedTx = await web3.eth.accounts.signTransaction(txObject, '<private_key>');
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return txReceipt.transactionHash;
};

export const getAuthUrl = async () => {
  const response = await axios.get(`${apiUrl}/get_auth_url`);
  return response.data;
};

export const TwitterLookup = async (token, token_secret) => {
  const result = await axios.get(`${apiUrl}/twitter_lookup?oauth_token=${token}&oauth_token_secret=${token_secret}`);
  return result.data;
};

export const UpdateUser = async (wallet, attribute, value, message, signature) => {
  const result = await axios.get(`${apiUrl}/update_user?wallet=${wallet}&attribute=${attribute}&value=${value}&message=${message}&signature=${signature}`);
  return result.data;
};

export const getAccessToken = async (pin, requestToken) => {
  let enc_token = requestToken;
  const result = await axios.get(`${apiUrl}/get_access_token?pin=${pin}&requestToken=${enc_token}`);
  return result.data;
};

export const Drip = async (wallet, amount) => {
  const result = await axios.get(`${apiUrl}/drip?wallet=${wallet}&amount=${amount}`);
  return result.data;
};

export const AddFaucetUser = async (wallet) => {
  const result = await axios.get(`${apiUrl}/add_faucet_user?wallet=${wallet}`);
  return result.data;
};

export const GetUser = async (wallet) => {
  const result = await axios.get(`${apiUrl}/get_user?wallet=${wallet}`);
  return result.data;
};

export const GetFaucetUserCount = async () => {
  const result = await axios.get(`${apiUrl}/get_faucet_user_count`);
  return result.data;
};

export const GetDripAmount = async () => {
  const result = await axios.get(`${apiUrl}/get_drip_amount`);
  return result.data;
};

export const GetBalance = async (walletAddress) => {
  const balance = await web3.eth.getBalance(walletAddress);
  return web3.utils.fromWei(balance, 'ether');
export const makeHttpRequest = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    throw new Error(`HTTP request failed: ${error.message}`);
  }
// Function to encrypt data using a symmetric key
export const encryptData = (data, key) => {
  // Replace 'encryptionAlgorithm' with the desired encryption algorithm
  const encryptionAlgorithm = 'AES-256-CBC';
  
  const cipher = crypto.createCipher(encryptionAlgorithm, encryptionKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  
  return encryptedData;
};

// Function to decrypt data using a symmetric key
export const decryptData = (encryptedData, key) => {
    // Replace 'decryptionAlgorithm' with the desired decryption algorithm
  const decryptionAlgorithm = 'AES-256-CBC';
  
  const decipher = crypto.createDecipher(decryptionAlgorithm, decryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  
  return decryptedData;
};

// Function to hash data using a cryptographic hash function
export const hashData = (data) => {
  // Function to hash data using a cryptographic hash algorithm
export const hashData = (data) => {
  // Replace 'cryptoHashAlgorithm' with the desired cryptographic hash algorithm
  const cryptoHashAlgorithm = 'SHA-256';
  
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = crypto.subtle.digest(cryptoHashAlgorithm, dataBuffer);
  
  return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
};
};

// Function to generate a random number within a range
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

// Function to convert a string to uppercase
export const convertToUppercase = (str) => {
   return inputString.toUpperCase();
};

// Function to convert a string to lowercase
export const convertToLowercase = (str) => {
 return inputString.toLowerCase();
};

// Function to shuffle an array
export const shuffleArray = (array) => {
   const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
};

// Function to get the current timestamp
export const getCurrentTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

// Function to generate a random string
export const generateRandomString = (length) => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

// Function to validate an email address
export const validateEmailAddress = (email) => {
   // Regular expression pattern for email validation
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Perform validation based on the email pattern
  const isValid = emailPattern.test(email);

  return isValid;
};

// Function to validate a phone number
export const validatePhoneNumber = (phone) => {
  // Remove any non-digit characters from the phone number
  const sanitizedNumber = phoneNumber.replace(/\D/g, '');

  // Perform validation based on specific rules or patterns
  // Example: Check if the number has 10 digits and starts with a valid country code or area code
  const isValid = /^[+]?[1-9]\d{1,14}$/.test(sanitizedNumber);

  return isValid;
};

// Function to validate a credit card number
export const validateCreditCardNumber = (creditCardNumber) => {
  const sanitizedNumber = creditCardNumber.replace(/\D/g, ''); // Remove non-digit characters
  const reversedNumber = sanitizedNumber.split('').reverse().join(''); // Reverse the number
  let sum = 0;

  for (let i = 0; i < reversedNumber.length; i++) {
    let digit = parseInt(reversedNumber[i], 10);

    if (i % 2 !== 0) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;};
};
const lastDripTimes = new Map();

export const Drip = async (wallet) => {
  const currentTime = new Date().getTime();
  
  // Check if enough time has passed since the last drip
  if (lastDripTimes.has(wallet)) {
    const lastDripTime = lastDripTimes.get(wallet);
    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours cooldown period
  
    if (currentTime - lastDripTime < cooldownPeriod) {
      throw new Error('Cooldown period not yet expired');
    }
  }
    lastDripTimes.set(wallet, currentTime);
};
export const Drip = async (wallet, referralCode) => {
  // Perform the drip operation
  
  // Check if a referral code is provided
  if (referralCode) {
    // Perform the drip operation
  
  // Check if a referral code is provided
  if (referralCode) {
    const referrer = await findReferrerByCode(referralCode);
    if (referrer) {
      const referralReward = 0.1; // Additional Ether to reward the referrer
      
      // Calculate the amount to reward the referrer
      const rewardAmount = referralReward * amount;
      
      // Send the reward to the referrer's wallet
      await sendEther(referrer.wallet, rewardAmount);
    }
   }
export const checkAndDrip = async (wallet) => {
  const balance = await getBalance(wallet);
  
  if (balance === '0') {
    await Drip(wallet, 10);
  }
};
};
