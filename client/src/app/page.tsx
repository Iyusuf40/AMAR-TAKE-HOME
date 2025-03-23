'use client'

import CustomSelect from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { Query, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Quotes() {

  const baseUrl = process.env.API_BASE_URL
  const [intervalMs] = useState(2000) // every 2 seconds
  const [symbol, setSymbol] = useState('')
  const [getQuoteBtnClicked, setGetQuoteBtnClicked] = useState(false)

  const { data: quote, error, isError, isLoading, isFetched } = useQuery<{ price: number, symbol: string }>({
    queryKey: ['todos', symbol],
    queryFn: async (): Promise<{ price: number, symbol: string }> => {
      const response = await fetch(`${baseUrl}/api/quote/${symbol}`)
      if (!response.ok) throw new Error('Error fetching quote')
      return await response.json()
    },
    refetchInterval: (query: Query<{ price: number, symbol: string }>) => {
      if (query.state.error) return false
      return intervalMs
    },
    enabled: !!symbol && getQuoteBtnClicked,
    retry: 3
  })

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 sm:flex-row flex-col">
        <CustomSelect
          className="h-8"
          options={["AAPL", "GOOGL", "BTCUSD"]}
          onChange={setSymbol}
        />
        <button
          onClick={() => {
            if (!symbol) {
              toast.error("Please select a symbol")
              return
            }
            setGetQuoteBtnClicked(!getQuoteBtnClicked)
          }}
          className="block h-[36px] w-[180px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {getQuoteBtnClicked ? "Stop" : "Get Quote"}
        </button>
      </div>
      <div className="mt-4 min-h-24">
        {isLoading ?
          <Spinner /> :
          <>
            <div className="mt-4 text-xl font-bold min-h-8">
              {isFetched && <div>Price: {(quote?.price || 0).toFixed(2)}</div>}
            </div>
            <div className="min-h-6">
              {isFetched && <div>{formatNow()}</div>}
            </div>

            <div className="min-h-6 text-red-500">
              {isError && <div>{error?.message || "Error fetching quote"}</div>}
            </div>
          </>
        }
      </div>
    </main>
  );
}


function formatNow() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}