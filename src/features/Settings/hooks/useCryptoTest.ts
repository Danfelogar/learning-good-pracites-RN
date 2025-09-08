import * as Crypto from "expo-crypto";
import { useState } from "react";

export const useCryptoTest = () => {
  const [cryptoTestResult, setCryptoTestResult] = useState({
    original: "",
    hashed: "",
  });

  const tryToCryptoData = async () => {
    const sensitiveData = JSON.stringify({
      user: "john_doe",
      password: "no_uses_texto_plano_así",
    });

    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      sensitiveData
    );

    setCryptoTestResult({
      original: sensitiveData,
      hashed,
    });
  };

  return { cryptoTestResult, tryToCryptoData };
};
