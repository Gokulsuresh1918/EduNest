"use client";

import { Check, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadRazorpay from "../utils/loadRazorpay";
import Loading from "./others/Loading";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface User {
  _id: string;
  isSubscribed: boolean;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

export default function PricingCards() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [pro, setPro] = useState(false);
  const [data, setData] = useState<RazorpayResponse | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userJSON = localStorage.getItem("User");
      const user = userJSON ? JSON.parse(userJSON) : null;
      setUser(user);
      setPro(user?.isSubscribed ?? false);
    }
  }, []);

  const handleBuyPro = async () => {
    setLoading(true);
    const scriptLoaded = await loadRazorpay();

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/sub/createOrder`, {
        amount: 499,
      });

      const { id, currency, amount } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "EduNest",
        description: "Subscription Plan",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQdLINnwzJyRoNKdfVWTHaS2F7a5u_Kii2tLIul6nM08Ccm_T9g",
        order_id: id,
        handler: (response: RazorpayResponse) => {
          toast.success(
            `Payment successful. Razorpay Payment ID: ${response.razorpay_payment_id}`
          );
          setData(response);
          setPro(true);
          setLoading(false);
        },
        prefill: {
          name: "EduNest",
          email: "edunestofficial@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "EduNest Office Kerala",
        },
        theme: {
          color: "#0A0118",
        },
        modal: {
          ondismiss: () => {
            toast.info("Transaction cancelled.");
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay order", error);
      toast.error("Error creating Razorpay order");
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateSubscription = async () => {
      if (data && user) {
        try {
          // Update subscription via API
          await axios.post(`${BASE_URL}/sub/updateSubscribe/${user._id}`, { data });

          // Retrieve the existing local storage data
          const storedUserData = localStorage.getItem('User');
          // console.log('storedUserData',storedUserData);
          
          if (storedUserData) {
            // Parse the JSON string to an object
            const parsedUserData = JSON.parse(storedUserData);
// console.log('parsedUserData',parsedUserData);

            // Update the isSubscribed field
            parsedUserData.isSubscribed = true;

            // Save the updated data back to local storage
            localStorage.setItem('User', JSON.stringify(parsedUserData));
          }
        } catch (error) {
          console.error("Error updating subscription", error);
        }
      }
    };

    updateSubscription();
  }, [data, user, BASE_URL]);

  const handleExplore = () => {
    router.push("/");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: 2,
          }}
        >
          <Card size="lg" variant="outlined">
            <Typography level="h2">
              {pro ? "Premium Member" : "Professional"}
            </Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
              <ListItem>
                <ListItemDecorator sx={{ color: "green" }}>
                  <Check />
                </ListItemDecorator>
                Ads Free
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ color: "green" }}>
                  <Check />
                </ListItemDecorator>
                Create Unlimited Class
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ color: "green" }}>
                  <Check />
                </ListItemDecorator>
                Space Studies Help of NASA
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ color: "green" }}>
                  <Check />
                </ListItemDecorator>
                Add Unlimited Students
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                {!pro ? "₹ 499" : "Now You are A Premium Member"}
              </Typography>
              {!pro ? (
                <Button
                  variant="solid"
                  color="primary"
                  endDecorator={<KeyboardArrowRight />}
                  onClick={handleBuyPro}
                >
                  Buy Pro
                </Button>
              ) : (
                <Button
                  variant="solid"
                  color="success"
                  endDecorator={<KeyboardArrowRight />}
                  onClick={handleExplore}
                >
                  Explore
                </Button>
              )}
            </CardActions>
          </Card>
        </Box>
      )}
      <ToastContainer />
    </>
  );
}
