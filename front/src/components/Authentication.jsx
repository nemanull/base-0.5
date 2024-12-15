import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import "./Authentication.css";

const Authentication = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState("");

  // Connect to MetaMask
  const connectMetaMask = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error("MetaMask is not installed or detected");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setWalletType("MetaMask");
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      setError(`MetaMask Error: ${err.message}`);
    }
  };

  // Connect to Phantom Wallet
  const connectPhantom = async () => {
    try {
      const { solana } = window;
      if (!solana || !solana.isPhantom) {
        throw new Error("Phantom Wallet is not installed or detected");
      }

      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      setWalletType("Phantom Wallet");
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      setError(`Phantom Wallet Error: ${err.message}`);
    }
  };

  // Fetch creators after authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://localhost:3001/api/creators") // Your backend API endpoint
        .then((res) => res.json())
        .then((data) => setCreators(data))
        .catch(() => setError("Failed to load creators"));
    }
  }, [isAuthenticated]);

  // Display Authentication Section
  if (!isAuthenticated) {
    return (
      <div className="content">
        <div className="auth-container">
          <h1 className="h1_auth">Authentication</h1>
          <p className="p_auth">Please select a wallet to connect:</p>
          <div className="auth-buttons">
            <button onClick={connectMetaMask}>Connect MetaMask</button>
            <button className="phantom" onClick={connectPhantom}>
              Connect Phantom Wallet
            </button>
          </div>

          {walletAddress && (
            <div>
              <p>Connected Wallet: {walletAddress}</p>
              <p>Wallet Type: {walletType}</p>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  // Display Main Section with Creators
  return (
    <div className="content main-section">
      <div className="creators-container">
        {creators.map((creator) => (
          <div className="creator-box" key={creator.id}>
            <p>Creator #{creator.id}</p>
            <button className="subscribe-button">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authentication;
