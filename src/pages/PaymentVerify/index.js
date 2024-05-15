import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../utils/api_payment";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { emptyCart } from "../../utils/api_cart";

export default function PaymentVerify() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  useEffect(() => {
    // trigger payment verification mutation on page load
    verifyPaymentMutation.mutate({
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature,
    });
  }, []);
  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (updatedOrder) => {
      // verify order is paid
      // if paid, show payment success message
      if (updatedOrder.status === "paid") {
        enqueueSnackbar("Payment is successful", {
          variant: "success",
        });
        emptyCart()
      }
      // if failed, show payment failure message
      if (updatedOrder.status === "failed") {
        enqueueSnackbar("Payment failed", {
          variant: "error",
        });
      }
      // redirect user to /orders page
      navigate("/orders");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  return <>Verifying the payment ...</>;
}
