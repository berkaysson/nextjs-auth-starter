"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Invalid token");
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  //   "There will be two message if confirming successful:
  //   one is "Email verified!" second is "Token does not exist!".
  //   Reason for this, in development react wokes the useEffect twice
  //   and if email is confirmed in first one token will be deleted,
  //   so in second it will give error because of token not exist anymore."

  return (
    <CardWrapper
      headerLabel="Confirm Email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      {!error && !success && <p>Confirming your verification...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </CardWrapper>
  );
};

export default NewVerificationForm;
