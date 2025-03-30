"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Abstraxion, useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import "@burnt-labs/ui/dist/index.css";

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  const [, setShow] = useModal();
  const [isLoading, setIsLoading] = useState(true);
  // Estado de loading e controlando o status de conexão


  useEffect(() => {
    // Inicia com isLoading como true para garantir que o redirecionamento só ocorra quando a conexão for estabelecida
    if (!isConnecting && isConnected) {
      setIsLoading(false); // Define o loading como falso após a conexão ser bem-sucedida
    }
  }, [isConnected, isConnecting]);

  useEffect(() => {
    // Evita redirecionamento enquanto a conexão está sendo estabelecida
    if (isConnected && !isLoading) {
      router.push("/dashboard"); // Redireciona após a conexão ser estabelecida
    } else if (!isConnected && !isConnecting && !isLoading) {
      router.push("/login"); // Redireciona para o login se não estiver conectado
    }
  }, [isConnected, isConnecting, isLoading, router]);

  // Exibe uma tela de loading enquanto está aguardando a conexão
  if (isLoading || isConnecting) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <p>Connecting... Please wait.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 via-teal-700 to-green-500 p-6 text-white">
      {bech32Address && (
        <div className="mb-4 border-2 border-primary rounded-md p-4 flex flex-row gap-4">
          <div className="flex flex-row items-center gap-6">
            <div>Address:</div>
            <div>{bech32Address}</div>
            <Button
          fullWidth
          onClick={() => { setShow(true) }}
          structure="base"
        >
          {bech32Address ? (
            <div className="flex items-center justify-center">ACCOUNT</div>
          ) : (
            ""
          )}
        </Button>
          </div>
        </div>
      )}
      
      
      <div className="w-full max-w-4xl rounded-lg bg-white bg-opacity-10 p-8 shadow-lg backdrop-blur-md">
        <h1 className="mb-4 text-4xl font-bold text-center text-white">Welcome to LearnChain Dashboard</h1>
        <p className="mb-6 text-center text-gray-200">
          Empower your educational journey with decentralized learning! Explore exclusive content, learn at your own pace, and be part of a blockchain-backed revolution that’s shaping the future of education.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Exclusive Educational Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2">Blockchain for Beginners</h3>
              <p className="text-gray-200 mb-4">Understand the fundamentals of blockchain technology and how it’s transforming various industries, including education.</p>
              <Button fullWidth structure="base" onClick={() => alert("Start Learning")}>
                Start Learning
              </Button>
            </div>

            <div className="bg-teal-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2">Decentralized Finance (DeFi)</h3>
              <p className="text-gray-200 mb-4">Dive into the world of DeFi, explore its potential for educational funding, and learn how decentralized systems can enhance financial independence.</p>
              <Button fullWidth structure="base" onClick={() => alert("Start Learning")}>
                Start Learning
              </Button>
            </div>

            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2">Smart Contracts for Education</h3>
              <p className="text-gray-200 mb-4">Learn how smart contracts are being used to facilitate transparent, automated, and secure transactions in educational environments.</p>
              <Button fullWidth structure="base" onClick={() => alert("Start Learning")}>
                Start Learning
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Features</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Earn Blockchain Certifications</h3>
            <p className="text-gray-200 mb-4">Complete courses and earn blockchain-backed certifications that prove your expertise and enhance your career prospects in the tech industry.</p>
            <Button fullWidth structure="base" onClick={() => alert("Stay Tuned")}>
              Stay Tuned
            </Button>
          </div>
        </section>

        
        <Abstraxion onClose={() => setShow(false)} />
      </div>
    </main>
  );
}
