"use client";

import { useState } from "react";
import { Button, Input, Modal } from "@heroui/react";
import { HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";
import { FaRegMoneyBill1 } from "react-icons/fa6";

const QUICK_AMOUNTS = [100, 200, 500, 1000];
const MIN_AMOUNT = 10;

export default function GiveFundModal() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const parsedAmount = parseFloat(amount);
  const isValid =
    amount !== "" && !isNaN(parsedAmount) && parsedAmount >= MIN_AMOUNT;

  function handleQuickAmount(value) {
    setAmount(String(value));
  }

  function handleAmountChange(e) {
    const raw = e.target.value;
    if (raw === "" || /^\d+(\.\d{0,2})?$/.test(raw)) {
      setAmount(raw);
    }
  }

  async function handleDonate() {
    if (!isValid) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("No checkout URL returned. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  const amountError =
    amount !== "" && !isNaN(parsedAmount) && parsedAmount < MIN_AMOUNT
      ? `Minimum donation is ৳${MIN_AMOUNT}`
      : undefined;

  return (
    <Modal>
      <Modal.Trigger>
        <Button
          className="bg-red-600 text-white hover:bg-red-700 rounded-2xl h-12 font-medium text-lg"
        >
          <HeartHandshake />
          Donate Now
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[400px]">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>
              <Modal.Icon className="bg-danger/10 text-danger">
                <HeartHandshake className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Make a Donation</Modal.Heading>
              {/* Modal.Description doesn't exist in this HeroUI version — use plain p */}
              <p className="text-sm text-default-500 mt-1">
                Support LifeDrop&apos;s blood donation activities. Every
                contribution helps save lives.
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="space-y-4">
              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm font-medium text-default-600 mb-2">
                  Quick amounts
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_AMOUNTS.map((val) => (
                    <Button
                      key={val}
                      size="sm"
                      variant={parsedAmount === val ? "solid" : "bordered"}
                      color={parsedAmount === val ? "danger" : "default"}
                      onPress={() => handleQuickAmount(val)}
                      className="text-sm font-semibold"
                    >
                      ৳{val}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <Input
                label="Custom Amount (BDT)"
                placeholder={`Minimum ৳${MIN_AMOUNT}`}
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                startContent={
                  <span className="text-default-500 text-sm pointer-events-none">
                    ৳
                  </span>
                }
                isInvalid={!!amountError}
                errorMessage={amountError}
                description={
                  isValid
                    ? `You are donating ৳${parsedAmount.toLocaleString("en-BD")}`
                    : undefined
                }
              />
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
              <Button
                className="w-full"
                variant="light"
                slot="close"
                isDisabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                className="w-full font-semibold"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
                startContent={
                  !isLoading ? <HeartHandshake className="size-4" /> : undefined
                }
                onPress={handleDonate}
              >
                {isLoading
                  ? "Redirecting…"
                  : `Donate ৳${isValid ? parsedAmount.toLocaleString("en-BD") : ""}`}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
